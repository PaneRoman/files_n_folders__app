import { Component } from "react";


class File extends Component {
    constructor(props) {
        super(props)
        console.log('FILE_expandedFolders', this.props.expandedFolders, 'FILE_name', this.props.name)

        // this.state = {
        //     // isVisible: this.isVisibleFile()
        //     isVisible: true
        // }
    }

    isVisibleFile = () => {
        return this.props.expandedFolders.includes(`/${this.props.name}`);
    }

    render() {
        
        const {name, mime} = this.props;
        // const {isVisible} = this.state;

        return (
            <li>
                {name}
            </li>

            // <>
            //     {isVisible ? <li>{name}</li> : null}
            // </>
        )
    }
}

export default File;