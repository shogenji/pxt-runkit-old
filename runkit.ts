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
