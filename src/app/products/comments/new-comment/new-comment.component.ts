import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { CommentsService } from '../../../services/comments.service';
import { Subject } from '../../../../../node_modules/rxjs';


@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {


  @Input() key: string;
  constructor( private commentsSevice: CommentsService) { }

  ngOnInit() {
    console.log(this.key);
  }

  onAddComment(f: NgForm) {
    console.log(f.value);
    const { userName, newComment } = f.value;
    console.log(userName +  ',   ' + newComment);
    this.commentsSevice.addNewComment(userName, newComment, this.key);
    f.reset();
    this.commentsSevice.changeMode.next();
  }

}
