import Draft from 'draft-js'
import {Map} from 'immutable'
import 'draft-js/dist/Draft.css';
import React from 'react'
import '../style/editor.css'
var {Editor, EditorState, RichUtils} = Draft
export default class GEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      showURLInput:false,
      urlValue:""
    }
    this.onChange = (editorState) => this.setState({editorState})
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }
  /**
   * 绑定按键
   * @param {*} command 
   * @param {*} editorState 
   */
  handleKeyCommand(command,editorState){
    const newState = RichUtils.handleKeyCommand(editorState,command);
    if(newState){
      this.onChange(newState);
      return 'handled'
    }
    return 'not-handled'
  }

  //---------controls events
  _onBoldClick(){
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState,'BOLD'))
  }
  _promptForLink(e){
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if(!selection.isCollapsed()){
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url="";
      if(linkKey){
        const linkInstance = contentState.getEntity(linkKey)
        url= linkInstance.getData().url
      }
      this.setState({
        showURLInput:true,
        urlValue:url,
      },()=>{
        setTimeout(()=>this.refs.url.focus(),0)
      })
    }
  }
  onURLChange(){

  }
  onLinkInputKeyDown(e){
    if(e.which===13){
      this.onConfirmLink(e)
    }
  }
  onConfirmLink(e){
    e.preventDefault()
    const {contentState,urlValue} = this.state
  }
  render(){

    let urlInput;
    if(this.state.showURLInput){
      urlInput = 
        <div style={styles.urlInputContainer}>
          <input
            onChange = {this.onURLChange.bind(this)}
            ref="url"
            type="text"
            value= {this.state.urlValue}
            onKeyDown = {this.onLinkInputKeyDown.bind(this)}
          />
          <button onMouseDown={this.onConfirmLink.bind(this)}>confirm</button>
        </div>
    }

    return (
      <div className="GEditor-container">
     
        <div className="GEditor-root">
          <div className="GEditor-controls">
            <button onClick={this._onBoldClick.bind(this)}>bold</button>
            <button onMouseDown = {this._promptForLink.bind(this)}>addLink</button>
          </div>
          <div className="GEditor-editor">
            <Editor
              editorState = {this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              ref="editor"
              placeholder="Type your words..."
            ></Editor>
          </div>
          
        </div>
        <div className= "GEditor-prompt">
          {urlInput}
        </div>
      </div>
    )
  } 
}
const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: { 
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};