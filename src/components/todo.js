import React from 'react';
import './todo.scss';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
let arraySort = require('array-sort');

export default class Todo extends React.Component {
    state = {
        items: [],
        startDate: new Date()
    }

    componentDidMount() {    
        axios.get(`http://localhost:8888/items/`)
                .then(response => {
                let items = response.data.itemArray;
                this.setState({items});
                //console.log(items)
                })
                .catch(error => {
                console.log(error)
        })
        };

    onSubmit = event => {
        event.preventDefault();
        console.log(event.target.datepicker);
        const postInfo = {
            title: event.target.title.value,
            description: event.target.description.value,
            due_date: event.target.datepicker.value,
            //status:event.target.status.checked,
        }
        axios
            .post(`http://localhost:8888/items/`, postInfo)
            .then(res => {
                axios
                    .get(`http://localhost:8888/items/`)
                    .then(res => {
                        console.log(res.data);
                        this.setState({
                            items: res.data.itemArray
                    });
                    });
            });
    };

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }
    
    removeItem = (id) => {
        //console.log(id)
        axios.delete(`http://localhost:8888/items/${id}`)
            .then(response => {
                const items = response.data;
                this.setState({ items })
                console.log(items);
        })
            .catch(error => {
            console.log(error)
        })
    }

    render () {
        return (
            <>
                <form className="todo-form" onSubmit={this.onSubmit}>
                    <div className="todo-form-container">
                        <div className="todo-subheadings">
                            <label className="title-label">Title</label>
                            <input name="title" className="title-input"></input>
                        </div>
                        <div className="todo-subheadings todo-description">
                            <label className="description-label">Description</label>
                            <input name="description" className="description-input"></input>
                        </div>
                        <div className="todo-subheadings">
                            <label className="due_date-label">Due Date</label>
                            <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            name="datepicker"
                            />
                        </div>
                        <div className="todo-subheadings">
                            <label className="status-label">Status</label>
                        </div>
                        <button className="todo-button" type="submit">Add</button>
                    </div>
                </form>
                <section className="todo-item-container">
                {
                    this.state.items.map((item, id) => {
                        return <TodoItem item={item} removeItem={this.removeItem}/>
                    })
                }
			    </section>
            </>
        )
    }
}

export class TodoItem extends React.Component {
    state = {
        status: false,
    }
    onClick = event => {
        event.preventDefault();
        this.setState({
            status: !this.state.status,
        })
    }

    render () {
        const { id, title, description, due_date } = this.props.item;
        return (
            <div className={this.state.status ? "todo-item todo-item__complete" : "todo-item todo-item__pending"}>
                <Link to={{ pathname:`/items/${id}`}}>
                    <div className="todo-item__item item1">{title}</div>
                    <div className="todo-item__item item2">{description}</div>
                    <div className="todo-item__item item3">{due_date}</div>
                    <button name="status" checked={this.state.status} onClick={this.onClick}>
                        {this.state.status ? 'Completed' : 'Pending'}
                    </button>
                </Link>
                <div className="dropdown__remove">
                    <button className="dropdown__remove--button" type="click" onClick={()=>{this.props.removeItem(this.props.item.id)}}>Remove</button>
                </div>
            </div>
        )
    }
}