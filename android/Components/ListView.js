import React, { Component } from 'react';
import { Text, View, TouchableHighlight, TextInput } from 'react-native';
import TodoModel from './TodoModel';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';
import Button from 'apsl-react-native-button'


let dataList = [
    new TodoModel('Aprender sempre mais'),
    new TodoModel('Trabalhar na Ezdelivery'),

];

var dataListOrder = getOrder(dataList);

function getOrder(list) {
    return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
    Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
    if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
    constructor(props) {
        super(props);
        this.updateDataList = this.updateDataList.bind(this);
        this._onCompletedChange = this._onCompletedChange.bind(this);
        this.state = {
            dataList: dataList,
            newValue: ''
        }

        this.onChange = this.onChange.bind(this);

    }


    updateDataList(dataList) {
        dataListOrder = getOrder(dataList);
        this.setState({
            dataList: dataList
        });
    }

    _onCompletedChange(dataItem, index) {
        let fromIndex = dataListOrder.indexOf(index);
        let toIndex = dataItem.completed ? dataListOrder.length - 1 : 0;
        moveOrderItem(this, fromIndex, toIndex);
    }

    onChange(event) {
        var title = event.nativeEvent.text;

        this.setState({
            newValue: title
        });

    }


    Add = () => {

        if (this.state.newValue != '') {
            var newDataItem = new TodoModel(this.state.newValue);

            var newdataList = this.state.dataList;

            newdataList.push(newDataItem);

            this.setState({
                dataList: newdataList,
                newValue: ''
            })



            this.updateDataList(dataList);
        }
    }


    render() {
        let listView = (<View></View>);
        if (this.state.dataList.length) {
            listView = (
                <SortableListView
                    ref='listView'
                    style={{ flex: 1 }}
                    data={this.state.dataList}
                    order={dataListOrder}
                    onRowMoved={e => moveOrderItem(this, e.from, e.to)}
                    renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} dataIndex={index} onCompletedChange={this._onCompletedChange} />}
                />
            );
        }

        return (
            <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>

                <TextInput style={{ height: 36, padding: 4, marginBottom: 20, fontSize: 16, backgroundColor: '#fff' }}
                    placeholder='Adicione'
                    blurOnSubmit={false}
                    value={this.state.newValue}
                    Add={this.Add}
                    onChange={this.onChange}>
                </TextInput>
                <Button
                    onPress={this.Add}>
                    Adicione
                </Button>
                {listView}
            </View>
        )
    }
};

module.exports = ListView;