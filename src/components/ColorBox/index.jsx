import React, { useState } from 'react';

ColorBox.protoType = {};

// Functional Component
function ColorBox(props) {
    const [color, setColor] = useState('white');
    return (
        <div>
            {color}
            <button onClick={() => setColor('black')}>Change to black</button>
            <button onClick={() => setColor('white')}>Change to white</button>
        </div>
    );
}

export default ColorBox;

// Class component
// class ColorBox extends PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             color: 'white',
//         }
//     }
//     render() {
//         return (
//             <div>
//                 {this.state.color}
//                 <button onClick={() => this.setState({ color: 'black' })}>
//                     Change to black
//                 </button>
//                 <button onClick={() => this.setState({ color: 'white' })}>
//                     Change to white
//                 </button>
//             </div>
//         );
//     }
// }