import {RXComponent} from "../basic/rxcomponent"
import {ToolGroup, ToolboxState} from "./controls/tool-group"
import {OptionRow, OptionRowLabel, OptionRowGroup} from "./controls/option-row"
import {ButtonGroup, OpButton} from "./controls/buttons"
import {OpSelect} from "./controls/select"
import {OpLabelsInput} from "./controls/label"

export class OptionBoxGroup extends ToolGroup{
  constructor(title, id, groupsState){
    super(title, id, groupsState)
  }

  add(optionRow){
    this.groupBody.pushChild(optionRow)
    return this
  }
}

export class OptionBox extends RXComponent{
  constructor(){
    super()
    this.state = new ToolboxState
    this.cssClass('toolbox')
    this.noFocusInnerHtml = `<div style="padding:20px;">No elements selected</div>`
    this.innerHTML = this.noFocusInnerHtml
    this.valueChanged = (node)=>{}
  }

  editNode(node){
    this.clear()
    this.node = node
    this.showContent(node)
    //this.showContent_old(node)
    this.children.forEach((child)=>{
      child.render(this.$dom)
    })
  }

  cancelEdit(){
    this.node = ''
    this.children.clear()
    this.setInnerHTML(this.noFocusInnerHtml)
  }

  showContent(node){
    var meta =node.meta
    var schema = node.schema

    for(var fieldName in schema){
      let field = schema[fieldName]

      let input = this.createWidget(field, fieldName)
      input.fieldName = fieldName
      input.valueChanged = (value, fdName)=>{
        node.meta[fdName] = value
        this.valueChanged(node)
      }
      let row = new OptionRow()
      row.pushChild(new OptionRowLabel(field.label))
      row.pushChild(input)
      this.getGroup(field.group).add(row)
    }

    if(this.children.length > 0){
      this.children.first()
                   .cssClass('no-title-top-border')
                   .active()
    }
  }

  getGroup(group){
    if(this[group]){
      return this[group]
    }

    if(group==='layout'){
      let groupCtrl = new OptionBoxGroup('Layout','layout', this.state)
      this[group] = groupCtrl
      this.pushChild(groupCtrl)
      return groupCtrl
    }
  }

  createWidget(field, fieldName){
    if(field.widget ==='OpSelect'){
      return new OpSelect(field.list, this.node.meta[fieldName], field.required)
    }
  }

  clear(){
    if(this['layout']){
      this['layout'] = ''
    }
    this.children.clear()
    this.setInnerHTML('')
  }

  showContent_old(node){
//------heading
    let row = new OptionRow()
    row.pushChild(new OptionRowLabel('Heading'))
    row.pushChild(new ButtonGroup()
                      .pushChild(new OpButton('H1', 'h1'))
                      .pushChild(new OpButton('H2', 'h2'))
                      .pushChild(new OpButton('H3', 'h3'))
                      .pushChild(new OpButton('H4', 'h4'))
                      .pushChild(new OpButton('H5', 'h5'))
                      .pushChild(new OpButton('H6', 'h6'))
                      .active('h2')
      )
//-------classes
    let classesRow = new OptionRow()
    classesRow.addRowLabel(new OptionRowLabel('Classes'))
    classesRow.pushChild(new OpSelect({
                          container:'container',
                          'container-fluid':'container-fluid'
                        },'', true))

//----------Size
    let sizeGroup = new OptionRowGroup()
    let fistRow = new OptionRow()
    fistRow.addRowLabel(new OptionRowLabel('Size'))
    fistRow.pushChild(new OpSelect({
                          'col-1':'col-1',
                          'col-2':'col-2',
                          'col-3':'col-3',
                          'col-4':'col-4',
                          'col-5':'col-5',
                          'col-6':'col-6',
                          'col-7':'col-7',
                          'col-8':'col-8',
                          'col-9':'col-9',
                          'col-10':'col-10',
                          'col-11':'col-11',
                          'col-12':'col-12',
                          col:'col',
                        },'', false).cssClass('two-column')
                      )
    let smRow = new OptionRow()
    smRow.addRowLabel(new OptionRowLabel('SM'))
    smRow.pushChild(new OpSelect({
                          'col-sm-1':'col-sm-1',
                          'col-sm-2':'col-sm-2',
                          'col-sm-3':'col-sm-3',
                          'col-sm-4':'col-sm-4',
                          'col-sm-5':'col-sm-5',
                          'col-sm-6':'col-sm-6',
                          'col-sm-7':'col-sm-7',
                          'col-sm-8':'col-sm-8',
                          'col-sm-9':'col-sm-9',
                          'col-sm-10':'col-sm-10',
                          'col-sm-11':'col-sm-11',
                          'col-sm-12':'col-sm-12',
                          col:'col-sm',
                        },'', false).cssClass('two-column')
                      )

    let mdRow = new OptionRow()
    mdRow.addRowLabel(new OptionRowLabel('MD'))
    mdRow.pushChild(new OpSelect({
                          'col-md-1':'col-md-1',
                          'col-md-2':'col-md-2',
                          'col-md-3':'col-md-3',
                          'col-md-4':'col-md-4',
                          'col-md-5':'col-md-5',
                          'col-md-6':'col-md-6',
                          'col-md-7':'col-md-7',
                          'col-md-8':'col-md-8',
                          'col-md-9':'col-md-9',
                          'col-md-10':'col-md-10',
                          'col-md-11':'col-md-11',
                          'col-md-12':'col-md-12',
                          col:'col-md',
                        },'', false).cssClass('two-column')
                      )

    let lgRow = new OptionRow()
    lgRow.addRowLabel(new OptionRowLabel('LG'))
    lgRow.pushChild(new OpSelect({
                          'col-lg-1':'col-lg-1',
                          'col-lg-2':'col-lg-2',
                          'col-lg-3':'col-lg-3',
                          'col-lg-4':'col-lg-4',
                          'col-lg-5':'col-lg-5',
                          'col-lg-6':'col-lg-6',
                          'col-lg-7':'col-lg-7',
                          'col-lg-8':'col-lg-8',
                          'col-lg-9':'col-lg-9',
                          'col-lg-10':'col-lg-10',
                          'col-lg-11':'col-lg-11',
                          'col-lg-12':'col-lg-12',
                          col:'col-lg',
                        },'', false).cssClass('two-column')
                      )

    let xlRow = new OptionRow()
    xlRow.addRowLabel(new OptionRowLabel('XL'))
    xlRow.pushChild(new OpSelect({
                          'col-xl-1':'col-xl-1',
                          'col-xl-2':'col-xl-2',
                          'col-xl-3':'col-xl-3',
                          'col-xl-4':'col-xl-4',
                          'col-xl-5':'col-xl-5',
                          'col-xl-6':'col-xl-6',
                          'col-xl-7':'col-xl-7',
                          'col-xl-8':'col-xl-8',
                          'col-xl-9':'col-xl-9',
                          'col-xl-10':'col-xl-10',
                          'col-xl-11':'col-xl-11',
                          'col-xl-12':'col-xl-12',
                          col:'col-lg',
                        },'', false).cssClass('two-column')
                      )


    sizeGroup.addFirstRow(fistRow)
             .addRow(smRow)
             .addRow(mdRow)
             .addRow(lgRow)
             .addRow(xlRow)



    this.pushChild(new OptionBoxGroup('Basic','groupBasic', this.state)
                        .cssClass('no-title-top-border')
                        .active()
                        .add(row)
                        .add(classesRow)
                        .add(sizeGroup)
                        //.add(labelRow)
                  )
    this.pushChild(new OptionBoxGroup('Layout', 'groupLayout', this.state))

    let classRow = new OptionRow().addRowLabel(new OptionRowLabel('Class'))
    classRow.pushChild(new OpLabelsInput())

    let styleRow = new OptionRow().addRowLabel(new OptionRowLabel('Style'))

    let attrRow = new OptionRow().addRowLabel(new OptionRowLabel('Attribute'))
    //styleRow.pushChild(new OpLabelsInput())
    
    this.pushChild(new OptionBoxGroup('Customize','groupCustomize', this.state)
                        .add(classRow)
                        .add(styleRow)
                        .add(attrRow)
      )
                          

  }

}
