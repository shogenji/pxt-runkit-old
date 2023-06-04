//% weight=100 color=#ff7700 icon="\uf1b9"
//% block="RunKit"
//% block.loc.ja="走らせようキット"
//% groups="['Movements', 'Settings']"
//% groups.loc.ja="['動作', '設定']"
namespace runkit {

    //% blockId=speed_max
    //% block="Max Speed"
    //% block.loc.ja="最高スピード"
    let speedMax = 512

    //% blockId=speed_ratio
    //% block="Speed Ratio"
    //% block.loc.ja="スピード"
    let speedRatio = 50

    enum Motors {
        //% blockId=left_motor
        //% block="left"
        //% block.loc.ja="左側"
        Left = 0,
        //% blockId=right_motor
        //% block="right"
        //% block.loc.ja="右側"
        Right = 1,
        //% blockId=both_motors
        //% block="both"
        //% block.loc.ja="両方"
        Both = 2
    }

    enum Dir {
        //% blockId=direction_forward
        //% block="Forward"
        Forward = 0,
        //% blockId=direction_backward
        //% block="Backward"
        Backward = 1
    }


    //% blockId=move_forward
    //% weight=100
    //% block="Move forward for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    //% group="Movements"
    export function moveForwardFor(duration: number): void {
        motorOn(Motors.Both, Dir.Forward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    //% blockId=move_backward
    //% weight=90
    //% block="Move backward for $duration"
    //% block.loc.ja="さがる（ミリ秒） $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    //% group="Movements"
    export function moveBackwardFor(duration: number): void {
        motorOn(Motors.Both, Dir.Backward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    //% blockId=rotate_ccw
    //% weight=80
    //% block="Rotate counter-clockwise for $duration"
    //% block.loc.ja="左回転（ミリ秒） $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    //% group="Movements"
    export function rotateCcwFor(duration: number): void {
        motorOn(Motors.Left, Dir.Backward, speedRatio)
        motorOn(Motors.Right, Dir.Forward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    //% blockId=rotate_cw
    //% weight=70
    //% block="Rotate clockwise for $duration"
    //% block.loc.ja="右回転（ミリ秒） $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    //% group="Movements"
    export function turnCwFor(duration: number): void {
        motorOn(Motors.Left, Dir.Forward, speedRatio)
        motorOn(Motors.Right, Dir.Backward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    //% blockId=stop
    //% weight=60
    //% block="Stop || for $duration"
    //% block.loc.ja="止まる ||（ミリ秒） $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=0
    //% duration.shadow="timePicker"
    //% group="Movements"
    export function stopFor(duration?: number): void {
        motorOff(Motors.Both)
        basic.pause(duration)
    }



    //% blockId=set_speed_ratio
    //% weight=50
    //% block="Set speed ratio to $speed"
    //% block.loc.ja="スピードを $speed ％に設定する"
    //% speed.min=0 speed.max=100
    //% speed.shadow="speedPicker"
    //% group="Settings"
    export function setSpeedRatio(speed: number): void {
        if (speed < 0) {
            speed = 0
        } else if (speed > 100) {
            speed = 100
        }
        speedRatio = (speedMax * speed) / 100
    }

    //% blockId=set_max_speed
    //% weight=40
    //% block="Set max speed to $speed"
    //% block.loc.ja="最高スピードを $speed に設定する"
    //% speed.min=0 speed.max=1023 speed.defl=256
    //% group="Settings"
    export function setMaxSpeed(speed: number): void {
        if (speed < 0) {
            speedMax = 0
        } else if (speed > 1023) {
            speedMax = 1023
        } else {
            speedMax = speed
        }
    }



    /**
     * Sets the requested motor running in chosen direction at a set speed.
     * If setup is not complete, calls the initialisation routine.
     * @param motors which motor to turn on
     * @param direction which direction to go
     * @param speed how fast to spin the motor
     */
    //% blockId=motor_on
    //% block="Turn $motors motor on direction $direction at speed $speed"
    //% speed.min=0 speed.max=100
    //% speed.shadow="speedPicker"
    function motorOn(motors: Motors, direction: Dir, speed: number): void {
        /*convert 0-100 to 0-1023 by a simple multiple by (speedMax / 100) */
        let outputVal = Math.round(speed * speedMax / 100)
        if (outputVal > speedMax) {
            outputVal = speedMax
        }

        switch (motors) {
            case Motors.Left:
                pins.digitalWritePin(DigitalPin.P13, direction)
                pins.digitalWritePin(DigitalPin.P14, outputVal)
                break

            case Motors.Right:
                pins.digitalWritePin(DigitalPin.P15, direction)
                pins.digitalWritePin(DigitalPin.P16, outputVal)
                break

            case Motors.Both:
                pins.digitalWritePin(DigitalPin.P13, direction)
                pins.digitalWritePin(DigitalPin.P14, outputVal)
                pins.digitalWritePin(DigitalPin.P15, direction)
                pins.digitalWritePin(DigitalPin.P16, outputVal)
                break

            default:
            //Stop - something has gone wrong
        }
    }

    /**
     * Turns off the specified motor.
     * @param motor which motor to turn off
     */
    //% blockId=motor_off
    //% block="Turn off $motor motor"
    function motorOff(motors: Motors): void {
        switch (motors) {
            case Motors.Left:
                pins.digitalWritePin(DigitalPin.P14, 0)
                break
            case Motors.Right:
                pins.digitalWritePin(DigitalPin.P16, 0)
                break
            case Motors.Both:
                pins.digitalWritePin(DigitalPin.P14, 0)
                pins.digitalWritePin(DigitalPin.P16, 0)
                break
            default:
            //Stop - something has gone wrong
        }
    }
}
