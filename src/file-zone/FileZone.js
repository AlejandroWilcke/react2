import React, { Component } from 'react';
import Word from '../classes/Word';
import getMockText from '../text.service';
import './FileZone.css';


//The state.text can be easily transformed to a prop value, so it can be reusable.
class FileZone extends Component {

    constructor(){
        super();
        this.state = {
            text: '',
            words: [],
            selected_word: {}
        }
    }

    componentDidMount(){
        this.getText();

        //Whenever you double click a word and it gets highlighted, the selectWord function will work with it.
        document.getElementById('file').addEventListener('dblclick', (e) => {
            this.selectWord();
        })
    }

    getText() {
        getMockText().then( text => this.setState( { text } ) );
    }

    selectWord(){
        
        //Get the highlighted word on the double click.
        let selected_word   = document.getSelection().toString().trim();
        if( !selected_word ) { return };

        //Get the index number that the word has inside the whole text.
        let indexOf = this.state.text.indexOf(selected_word);

        let word_already_exists = false;

        //If you are selecting a word with the same index than one that already exists, then it is the same word.
        this.state.words.forEach( word => { if( word.indexOf === indexOf ) word_already_exists = true; return; } );

        let word = new Word(selected_word, indexOf);

        //So, if the word was selected before, set the selected_word state to that one.
        if( word_already_exists ) {
            this.setState( { selected_word: word } )
        }else{
            //Else, add it to the others.
            this.setState( prevState => ( {
                words: [ ...prevState.words, word ],
                selected_word: word
                }
            ));
        }
    }

    setCharAt(str, index, selected_word) {
        
        if(index > str.length-1) return str;
        //word_value will be the actual text content, without the b/u/i tags.
        //Ex: 
        //      selected_value  = <i><b>Example</b></i>
        //      word_value      = Example
        
        if(selected_word.includes('<')){
            return str.substr(0,index) + selected_word + str.substr(index + selected_word.length - 7 );
        }else{
            console.log('asd')
            let word_value = selected_word.replace(/<b>|<u>|<i>|<\/b>|<\/u>|<\/i>/gi, '')
            return str.substr(0,index) + selected_word + str.substr(index + word_value.length + 7 );
        }
        
    }

    toggleStyle = style => {

        let SW = this.state.selected_word;
        SW[style] ? SW[style] = false : SW[style] = true;

        if(style === 'bold'){

            SW.bold ? SW.text = `<b>${SW.text}</b>` : SW.text = SW.text.replace(/<b>|<\/b>/gi, '');

        }else if(style === 'italic'){

            SW.italic ? SW.text = `<i>${SW.text}</i>` : SW.text = SW.text.replace(/<i>|<\/i>/gi, '');

        }else if(style === 'underline'){

            SW.underline ? SW.text = `<u>${SW.text}</u>` : SW.text = SW.text.replace(/<u>|<\/u>/gi, '');

        }
        
        //let text = this.state.text[SW.indexOf].replace(SW.text);
        let text = this.setCharAt(this.state.text, SW.indexOf, SW.text);
        console.log(text)
        this.setState({ text }, () => {document.getElementById('file').innerHTML = this.state.text; })
        
        
    }

    showState = () => console.log(this.state);

    render() {
        return (
            <div>
                <div id="control-panel">
                    <div id="format-actions">
                        <button className="format-action" type="button" onClick={() => this.toggleStyle('bold')}><b>B</b></button>
                        <button className="format-action" type="button" onClick={() => this.toggleStyle('italic')}><i>I</i></button>
                        <button className="format-action" type="button" onClick={() => this.toggleStyle('underline')}><u>U</u></button>
                        <button className="format-action" type="button" onClick={() => this.showState()}><u>STATE</u></button>
                    </div>
                </div>
                <div id="file-zone">
                    <p id="file">
                        {this.state.text}
                    </p>
                </div>
            </div>
        );
    }
}

export default FileZone;
