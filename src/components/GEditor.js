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
      editorState: EditorState.createEmpty()
    }
    this._onChange = (editorState) => this.setState({editorState})
  }
    
  render(){
    return (
      <div className="GEditor-container">
        <div className="GEditor-root">
          <div className="GEditor-editor">
            <Editor
              editorState = {this.state.editorState}
              onChange={this._onChange}
              ref="editor"
              placeholder="Type your words..."
            ></Editor>
          </div>
        </div>
      </div>
    )
  }
}