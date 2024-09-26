import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-boardgame-collection',
  standalone: true,
  imports: [],
  templateUrl: './boardgame-collection.component.html',
  styleUrl: './boardgame-collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardgameCollectionComponent {

}
