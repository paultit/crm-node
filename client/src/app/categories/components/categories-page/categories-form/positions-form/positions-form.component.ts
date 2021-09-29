import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/core/services/material/material.service';
import { PositionsService } from 'src/app/core/services/positions/positions.service';
import { Position } from '../../../../../shared/interfaces/position/position';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = [];
  loading = false;
  modal: MaterialInstance;
  form: FormGroup;
  positionId = null;
  nameModal: string = 'Add';
  constructor(private positionsService: PositionsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })
    this.loading = true;
    this.positionsService.fetch(this.categoryId)
    .subscribe((positions) => {
      this.positions = positions;
      this.loading = false;
    })
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }
  ngOnDestroy() {
    this.modal.destroy();
  }

  onSelectPosition(position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    if (this.nameModal !== 'Edit') {
      this.nameModal = 'Edit';
    }
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1
    });
    if (this.nameModal !== 'Add') {
      this.nameModal = 'Add';
    }
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    this.form.disable();
    const newPosition = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close();
      this.form.reset({
        name: '',
        cost: 1
      })
      this.form.enable();
    }
    if (this.positionId) {
      newPosition['_id'] = this.positionId;
      this.positionsService.updatePosition(newPosition)
      .subscribe(
        position => {
          const idx = this.positions.findIndex(p => p._id === position._id);
          this.positions[idx] = position;
          MaterialService.toast('Changes saved');
        },
        error => MaterialService.toast(error.error.message),
        () => completed()
      )
    } else {
      this.positionsService.createPosition(newPosition)
    .subscribe(
      position => {
        MaterialService.toast('Position created');
        this.positions.push(position);
    },
    error => MaterialService.toast(error.error.message),
    () => completed()
    )
    }
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const decision = window.confirm(`Delete position "${position.name}" ?`);
    if (decision) {
      this.positionsService.deletePosition(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(idx, 1);
          MaterialService.toast(response.message);
        },
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
  }
}
