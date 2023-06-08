/**
 * Extensions for switch education's "Run Your micro:bit Kit."
 */
//% weight=100 color=#ff7700 icon="\uf1b9"
//% block="Run Kit"
//% block.loc.ja="走らせようキット"
//% groups="['Movements', 'Settings']"
//% groups.loc.ja="['Movements', 'Settings']"
namespace runkit {

    let speedMax = 512
    let speedRatio = 50

    enum Motors {
        Left = 0,
        Right = 1,
        Both = 2
    }

    enum Dir {
        Forward = 0,
        Backward = 1
    }


    /**
     * Move forward for a specified duration time (in milliseconds).
     */
    //% blockId=move_forward
    //% weight=100
    //% block="Move forward for $duration"
    //% block.loc.ja="すすむ（ミリ秒）$duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    //% group="Movements"
    export function moveForward(duration: number): void {
        motorOn(Motors.Both, Dir.Forward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    /**
     * Move backward for a specified duration time (in milliseconds).
     */
    //% blockId=move_backward
    //% weight=90
    //% block="Move backward for $duration"
    //% block.loc.ja="さがる（ミリ秒）$duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    //% group="Movements"
    export function moveBackward(duration: number): void {
        motorOn(Motors.Both, Dir.Backward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    /**
     * Rotate counter-clockwise for a specified duration time (in milliseconds).
     */
    //% blockId=rotate_ccw
    //% weight=80
    //% block="Rotate counter-clockwise for $duration"
    //% block.loc.ja="左回転（ミリ秒） $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    //% group="Movements"
    export function rotateCcw(duration: number): void {
        motorOn(Motors.Left, Dir.Backward, speedRatio)
        motorOn(Motors.Right, Dir.Forward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    /**
     * Rotate clockwise for a specified duration time (in milliseconds).
     */
    //% blockId=rotate_cw
    //% weight=70
    //% block="Rotate clockwise for $duration"
    //% block.loc.ja="右回転（ミリ秒） $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    //% group="Movements"
    export function turnCw(duration: number): void {
        motorOn(Motors.Left, Dir.Forward, speedRatio)
        motorOn(Motors.Right, Dir.Backward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    /**
     * Stop the movement.
     */
    //% blockId=stop
    //% weight=60
    //% block="Stop"
    //% block.loc.ja="止まる"
    //% group="Movements"
    export function stop(): void {
        motorOff(Motors.Both)
    }



    //% blockId=set_speed_ratio
    //% weight=50
    //% block="Set speed ratio to $speed"
    //% block.loc.ja="スピードを $speed ％に設定する"
    //% speed.min=0 speed.max=100
    //% speed.shadow="speedPicker"
    //% group="Settings"
    //% subcategory="Settings"
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
    //% subcategory="Settings"
    export function setMaxSpeed(speed: number): void {
        if (speed < 0) {
            speedMax = 0
        } else if (speed > 1023) {
            speedMax = 1023
        } else {
            speedMax = speed
        }
    }



    function motorOn(motors: Motors, direction: Dir, speed: number): void {
        /* convert 0-100 to 0-1023 by a simple multiple by (speedMax / 100) */
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
            // Stop - something has gone wrong
        }
    }

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
            // Stop - something has gone wrong
        }
    }
}
