import { Injectable } from "@nestjs/common";
import { Park } from "./parking.model";

@Injectable()
export class ParkingService {
    park: Park[] = [];
    size: number = 0

    insertPark(car_reg_no: string, car_color: string){
        let ind = -1
        for(let i=0;i<this.park.length;i++){
            if(this.park[i]===null){
                ind = i;
                break;
            }
        }
        if(ind === -1) return null;
        const newPark = new Park(car_reg_no,car_color)
        console.log(newPark, 'service')
        this.park[ind] = newPark;
        return newPark;
    }

    startPar(slot: number){
        for(let i=0;i<slot;i++) {
            this.park.push(null);
        }
        this.size += slot
        return this.park.length;
    }

    carwithColor(col: string) {
        console.log('here');
        let ans = this.park.filter(item=>{
            console.log(item);
            if(item&&item.car_color===col) {
                console.log(item)
                return true;
            }
            return false;
        })
        return ans;
    }

    slotWithColor(col: string) {
        let ans : number[] = []
        this.park.forEach((item,ind)=>{
            if(item.car_color === col)
            ans.push(ind);
        })

        return ans;
    }

    freeSlot(slot: number):  object{
        if(slot>=this.size) return {msg: 'slot does not exist'}
        if(this.park[slot]===null) return {msg: 'slot was already free'}
        this.park[slot] = null;
        return {'freed_slot_number': slot}
    }

    freeCarSlot(car_reg_no: string){
        let ind = this.park.findIndex(item=>item.car_reg_no === car_reg_no)
        if(ind===-1) return null;
        this.park[ind] = null
        return {'freed_slot_number': ind+1}
    }

    allCar(){
        return this.park.filter(item=>item!==null)
    }
}