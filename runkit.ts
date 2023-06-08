/**
 * Extensions for switch education's "Run Your micro:bit Kit."
 */
//% weight=100 color=#ff7700 icon="\uf1b9"
//% block="Run Kit"
namespace runkit {
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
    }
}
