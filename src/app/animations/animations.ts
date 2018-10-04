import { trigger, state, transition, animate, keyframes, style, query, stagger } from '@angular/animations';


// comments Animation
export let show =   trigger('onAdd', [
    transition(':enter', [
        animate('0.8s ease-out', keyframes([
          style( {opacity: 0, transform: 'translateX(-20%)', color: 'rgb(102, 255, 102)', offset: 0}),
          style( {opacity: 0.8, transform: 'translateX(100px)',  offset: 0.5 }),
          style( {opacity: 1, transform: 'translateX(0)', color: 'black',  offset: 1 }),
        ])),
    ])
  ]);

  // header  logo animation
  export let slideDown = trigger('slideDownAnim', [
    transition(':enter', [
      query('h3', [
        style({ transform: 'translateY(-50px)'}),
        animate('.6s')
      ])
    ])
  ]);

  // form animation
    export let formAppearence = trigger('slideDownForm', [
      transition(':enter', [
        query('form', [
          style({ transform: 'translateY(-10%)', opacity: 0}),
          animate('.6s')
        ])
      ])
    ]);

    // newProduct animation
    export let slideUp = trigger('slideUpForm', [
      transition(':enter', [
        query('form', [
          style({ transform: 'translateY(20%)', opacity: 0}),
          animate('.6s')
        ])
      ])
    ]);

  // fadeIn animation
  export let fadeIn = trigger('show', [
    state('in', style({
      transform: 'translateX(0)'
    })),
    transition('void => *', animate(
      400, keyframes([
        style( { opacity: 0, offset: 0 } ),
        style( { opacity: 1, offset: 1 } )
      ])
    ))
    ]);

  // header nav animation
  export let slideRight = trigger('slideRightAnim', [
    transition('* => *', [
      query('.horSlide', style({ opacity: 0, transform: 'translateX(40px)'})),

      query('.horSlide', stagger('300ms', [
        animate('500ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])),

      query('.horSlide', [
        animate(1000, style('*'))
      ])
    ])
  ]);

  // categories animation
  export let slideOneByOne = trigger('listAnimation', [
    transition('* => *', [
      query(':enter', style({ opacity: 0}), {optional: true}),

      query(':enter', stagger('300ms', [
        animate('1s ease-out', keyframes([
          style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
          style({opacity: .5, transform: 'translateX(15px)', offset: 0.8}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]), {optional: true})
    ])
  ]);

