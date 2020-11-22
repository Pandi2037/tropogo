import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {

    format(date: Date, displayFormat: string): string {

        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        if (displayFormat == "input") {
            let day = date.getDate();
            let month = date.getMonth();
            console.log(this._to2digit(day) + '/' + months[month]);
            return this._to2digit(day) + '/' + months[month];
        } else {
            return date.toDateString();
        }
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
}