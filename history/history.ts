import { calculator } from './index';
import { expect , assert} from 'chai';

describe('calculator should', () => {
    it('sum values with comma', () => {
        expect(calculator("1,3")).eql(4);
        expect(calculator("2,3")).eql(5);
    });
    it('empty string is zero', () => {
        expect(calculator("")).eql(0);
    });
    it('sum an indefinate number of numbers', () => {
        expect(calculator("1,2,3,4,5,6,7,8,9")).eql(45);
    });
    it('reject bad separators format', () => {
        assert.throws(() => calculator("1,"), Error, "not well separated");
        assert.throws(() => calculator("1,2,,1"), Error, "not well separated");
        assert.throws(() => calculator(",1,2,3"), Error, "not well separated")
    });
    it('ignore jumplines',() => {
        expect(calculator("\n\n1,\n\n3,2\n\n")).eql(6)
    })
    it('accept changing the delimiter character',() => {
        expect(calculator("//d\n1d2d1")).eql(4)
        expect(calculator("//q\n1q2q1")).eql(4)
    })
    it('reject bad non comma separators', () => {
        assert.throws(()=> calculator("//d\n1d2dd3"))
    })
});

//-------- IMPLEMENTATION --------

function isInvalidlySeparated(str: string): boolean {
    return str.endsWith(',') || str.includes(",,") || str.startsWith(",")
}

function separateWithCommas(str: string): string {
    const separator = str.split("\n")[0].split("//")[1]
    return str.replace("//"+separator+"\n","").replace(new RegExp(separator,'g'),',')
}

export function calculator(string : string): number {
    if(isInvalidlySeparated(string)){ 
         throw new Error('not well separated');
    }
    const commaSeparatedString = separateWithCommas(string)
    
    return commaSeparatedString.split(',')
    .reduce((accum,current) => accum + +current, 0)
}