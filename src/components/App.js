import React, {Component} from 'react';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";


class App extends Component {

    render() {
        return (
            <div className="App">
                <div id="preloader" className="visible"/>
                <div className="container">
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;
