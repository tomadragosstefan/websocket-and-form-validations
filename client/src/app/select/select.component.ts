import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface SelectOptionInterface
{
  value: string,
  text: string
}
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
 @Input() options: SelectOptionInterface[]  = [];
 @Input() inputId = "";
 @Input() label = "Label";
 @Input() control = new FormControl();
 @ContentChild('leftIcon',{static: false}) leftIconTemplateRef: TemplateRef<any>|undefined;
  isOpen: boolean = false;

  getLabel(selectedValue: string){
    if (!selectedValue) return "";
    const optionSelected = this.options.find(option => option.value === selectedValue);
    return optionSelected!.text;
  }

  onToggleDrDwn(){
    this.isOpen = !this.isOpen;
  }

  onSelectDropDwn(optionValue: string){
    this.control.setValue(optionValue);
    this.isOpen = false;
  }

}
