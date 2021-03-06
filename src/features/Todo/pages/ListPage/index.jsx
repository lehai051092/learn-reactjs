import React, {useEffect, useMemo, useState} from 'react';
import TodoList from '../../components/TodoList';
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import queryString from 'query-string';
import TodoForm from '../../components/TodoForm';

ListPage.propTypes = {};

function ListPage(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'Eat',
            status: 'new',
        },
        {
            id: 2,
            title: 'Sleep',
            status: 'completed',
        },
        {
            id: 3,
            title: 'Code',
            status: 'new',
        },
    ];

    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        const params = queryString.parse(location.search);
        return params.status || 'all';
    });

    useEffect(() => {
        const params = queryString.parse(location.search);
        setFilteredStatus(params.status || 'all');
    }, [location.search]);

    const handleTodoClick = (todo, index) => {
        // clone current array to new array
        const newTodoList = [...todoList];
        // toggle state
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'new' ? 'completed' : 'new',
        };
        //update todo list
        setTodoList(newTodoList);
    };

    const handleShowAllClick = () => {
        const queryParams = {status: 'all'};
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    const handleShowCompletedClick = () => {
        const queryParams = {status: 'completed'};
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    const handleShowNewClick = () => {
        const queryParams = {status: 'new'};
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    const renderedTodoList = useMemo(() => {
        return todoList.filter((todo) => filteredStatus === 'all' || filteredStatus === todo.status);
    }, [todoList, filteredStatus]);

    const handleTodoFormSubmit = (values) => {
        const newTodoList = [...todoList];
        const newTodo = {
            id: (newTodoList[newTodoList.length - 1]) ? newTodoList[newTodoList.length - 1].id + 1 : 1,
            title: values.title,
            status: 'new'
        };
        newTodoList.push(newTodo);
        setTodoList(newTodoList);
    }

    return (
        <div>
            <h3>What to do</h3>
            <TodoForm onSubmit={handleTodoFormSubmit}/>
            <h3>Todo List</h3>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick}/>
            <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowCompletedClick}>Show Completed</button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div>
        </div>
    );
}

export default ListPage;
