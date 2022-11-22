import { Controller, Post, Body, Get, Param, Patch, HttpException, HttpStatus } from "@nestjs/common";
import { ParkingService } from './parking.service'

@Controller()
export class ParkingController {
    constructor(private parkingService: ParkingService) {}
    @Post('parking_lot')
    startParking(@Body("no_of_slot") slot: number) {
        let length = this.parkingService.startPar(slot);
        return {"total_slot": length}
    }

    @Patch('parking_lot')
    increaseParking(@Body('increment_slot') incSlot: number){
        let length = this.parkingService.startPar(incSlot);
        return {"total_slot": length}
    }

    @Post('park')
    addParking(
        @Body('car_reg_no') reg_no: string,
        @Body('car_color') color: string
        ) {
            const park = this.parkingService.insertPark(reg_no,color)
            if(park)
            return park;
            throw new HttpException('Parking is Full',HttpStatus.BAD_REQUEST);
    }

    @Get('registration_numbers/:color')
    getCarwithColor(@Param('color') col: string){
        return this.parkingService.carwithColor(col)
    }

    @Get('slot_numbers/:color')
    getSlotWithColor(@Param('color') col : string) {
        return this.parkingService.slotWithColor(col)
    }

    @Post('clear')
    freeSlot(@Body('slot_number') slot: number,
     @Body("car_registration_no") car_reg_no: string){
        if(slot){
            let freed = this.parkingService.freeSlot(slot);
            if(freed.hasOwnProperty('freed_slot_number')) return freed;
            throw new HttpException( freed['msg'], HttpStatus.BAD_REQUEST)
        }
        if(car_reg_no){
            let freed = this.parkingService.freeCarSlot(car_reg_no);
            if(freed) return freed;
            throw new HttpException('Registration number not found', HttpStatus.BAD_REQUEST)
        }
     }

    @Get('status')
    getAllCar(){
        return this.parkingService.allCar();
    }

}