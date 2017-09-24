import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import CheckBox from './CheckBox';

class ListViewItem extends Component {
    constructor(props) {
        super(props);
        this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }

    _onCheckBoxPressed() {
        var data = this.state.data;
        data.completed = !data.completed;
        this.setState({
            data: data
        });

        this.props.onCompletedChange(data, this.props.dataIndex);
    }

    render() {
        let data = this.state.data;
        let color = data.completed ? '#C5C8C9' : '#000';
        let textDecorationLine = data.completed ? 'line-through' : 'none';
        return (
            <TouchableHighlight underlayColor={'#eee'} style={{ paddingTop: 0, paddingBottom: 6,paddingLeft:5, backgroundColor: "#f4f4f4", borderBottomWidth: 1, borderColor: '#eee',marginTop:8, borderRadius:10 }} {...this.props.sortHandlers}>
                <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:10 }}>
                    <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox>
                    <Text style={{ fontSize: 18, color: color, textDecorationLine: textDecorationLine }}>{data.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

module.exports = ListViewItem;