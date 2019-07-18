import { trigger, state, style, transition, animate, group, keyframes } from '@angular/animations';




// export const addIngredientAnim =
//     trigger('list1', [
//         state('in', style({           
//             opacity: 1,
//             transform: 'translateX(0)'
//         })),
//         transition('void => *', [    
//             style({                    
//                 opacity: 0,
//                 transform: 'translateX(-100px)'
//             }),
//             animate(200)]),
//         transition('* => void', [
//             animate(200, style({
//                 transform: 'translateX(100px)',
//                 opacity: 0
//             }))])
//     ]);

export const addIngredientAnim =
    trigger('addIngredientAnim', [
        state('in', style({                 //Style the state has
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition('void => *', [           //Transition that has to be made between not existing and in
            animate(400, keyframes([       //Keyframes allows for the defining of keyframes
                style({                   // Must define a style to transition to
                    transform: 'translateX(-80px)',
                    opacity: 0,
                    offset: 0,
                }),
                style({
                    transform: 'translateX(-40px)',
                    opacity: 0.5,
                    offset: 0.4,
                }),
                style({
                    transform: 'translateX(+20px)',
                    opacity: 1,
                    offset: 0.7,
                }),
                style({
                    transform: 'translateX(-10px)',
                    opacity: 1,
                    offset: 0.9,
                }),
                style({
                    transform: 'translateX(0px)',
                    opacity: 1,
                    offset: 1,
                })
            ]
            ))]),
        transition('* => void', [
            group([
                animate(200, style({
                    color: 'red'
                })),
                animate(300, style({
                    transform: 'translateX(100px)',
                    opacity: 0
                }))
            ])
        ])
    ]);
export const addCandidateAnim =
    trigger('addCandidateAnim', [
        state('in', style({                 //Style the state has
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition('void => *', [           //Transition that has to be made between not existing and in
            animate(500, keyframes([       //Keyframes allows for the defining of keyframes
                style({                   // Must define a style to transition to
                    transform: 'translateY(-100px)',
                    opacity: 0,
                    offset: 0,
                }),
                style({
                    transform: 'translateY(0px)',
                    opacity: 0.5,
                    offset: 0.2,
                }),
                style({
                    transform: 'translateY(+40px)',
                    opacity: 1,
                    offset: 0.4,
                }),
                style({
                    transform: 'translateY(+20px)',
                    opacity: 0.5,
                    offset: 0.6,
                }),
                style({
                    transform: 'translateY(0px)',
                    opacity: 1,
                    offset: 0.8,
                }),
            ]
            ))]),
        transition('* => void', [
            group([
                animate(200, style({
                    color: 'red'
                })),
                animate(300, style({
                    transform: 'translateX(100px)',
                    opacity: 0
                }))
            ])
        ])
    ]);
