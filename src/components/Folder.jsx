import { Component } from "react";
import { renderCurrentType } from "../utils";

class Folder extends Component {
    constructor(props) {
        super(props)
        console.log('FOLDER_expandedFolders', this.props.expandedFolders, 'FOLDER_name', this.props.name)
        // console.log('this.openNextFolder', this.openNextFolder())

        this.state = {
            isOpen: this.isOpenFolder(),
            expandedFolders: this.props.expandedFolders,
            folderLogic: this.props.logic
        }
    }

    isOpenFolder = () => {
        return this.props.expandedFolders.includes(`/${this.props.name}`);

        // return this.props.expandedFolders.includes(`/${this.props.name}`);
    }

    openNextFolder = () => {
        return this.state.expandedFolders
            .filter(folder => folder.includes(this.props.name))
            .map(folder => folder.replace(`/${this.props.name}`, ''))
            .filter(folder => !!folder);

        // return this.props.expandedFolders
        //     .filter(folder => folder.includes(this.props.name))
        //     .map(folder => folder.replace(`/${this.props.name}`, ''))
        //     .filter(folder => !!folder);
    }

    folderOpenClose = (event) => {
        // console.log(event.currentTarget);
        event.stopPropagation();

        this.setState(({isOpen}) => ({
                isOpen: !isOpen,
                expandedFolders: [],
                folderLogic: 'browser'
        }))
    }

    // expandedFolderName = (data) => {
    //     console.log('data', data);

    // }


    render() {
       
        const {name, children} = this.props;
        const {isOpen, folderLogic} = this.state;

        console.log('this.openNextFolder', this.openNextFolder());

        return (
            <ul onClick={this.folderOpenClose}>

                FOLDER {name}
                {isOpen ? renderCurrentType(children, this.openNextFolder(), folderLogic) : null}
            </ul>
        )
    }
}

export default Folder;