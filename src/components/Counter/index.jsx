import React, { useState } from 'react';

Counter.protoType = {};

// Functional Component
function Counter(props) {
    const [count, setCount] = useState(0);
    return (
        <div>
            {count}
            <button onClick={() => setCount(x => x + 1)}>Increase</button>
        </div>
    );
}

export default Counter;

// class Counter extends PureComponent {
//     constructor(props) {
//         super(props);
//         // State declaration
//         this.state = {
//             count: 0,
//         }
//     }
//     render() {
//         return (
//             <div>
//                 {this.state.count}
//                 {/* use this.setState() function to update state */}
//                 <button
//                     onClick={() => this.setState(prevState => ({
//                         count: prevState.count + 1
//                     }))}
//                 >
//                     Increase
//                 </button>
//             </div>
//         );
//     }
// }