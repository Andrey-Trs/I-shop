import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { show } from '../../animations/animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  animations: [ show ]
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() name: string;
  @Input() key: string;

  @ViewChild('topPage') onTop: ElementRef;

  commentsArr: Object[];
  commentsSubscription: Subscription;
  newCommentSubscription: Subscription;
  commentsMode: Subscription;

  writeComponentMode =  false;

  constructor( private commentsService: CommentsService ) { }

  ngOnInit() {
    this.commentsService.fetchProductComments(this.key);
    this.commentsSubscription = this.commentsService.addedComments.subscribe(
      (commentsList: string[]) => {
        this.commentsArr = commentsList;
        console.log(this.commentsArr);
      }
    );
    this.newCommentSubscription = this.commentsService.newComment.subscribe(
      (newComment: Object) => {
        this.commentsArr.unshift(newComment);
        console.log(newComment);
      }
    );
    this.commentsService.changeMode.subscribe(
      () => {
        this.writeComponentMode = false;
      }
    );
  }

  ngAfterViewInit() {
    this.onTop.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }

  ngOnDestroy() {
    this.commentsSubscription.unsubscribe();
    this.newCommentSubscription.unsubscribe();
  }

}
