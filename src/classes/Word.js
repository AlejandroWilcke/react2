class Word {
    constructor(text, indexOf){
        this.text       = text;
        this.indexOf    = indexOf;
        this.bold       = false;
        this.italic     = false;
        this.underline  = false;
        this.color      = 'black';
    }
}

export default Word;