import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

    state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null
    };

     // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 3000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getData')
            .then(data => data.json())
            .then(res => this.setState({data:res.data}));
    };

    putDataToDB = message => {
        let currentIds = this.state.data.map(data => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
        }
    
        axios.post("http://localhost:3001/api/putData", {
          id: idToBeAdded,
          message: message
        });
      };

      deleteFromDB = idTodelete => {
        let objIdToDelete = null;
        this.state.data.forEach(dat => {
          if (dat.id === idTodelete) {
            objIdToDelete = dat.id;
          }
        });
    
        axios.delete("http://localhost:3001/api/deleteData", {
          data: {
            id: objIdToDelete
          }
        });
      };

      updateDB = (idToUpdate, updateMessage) => {
        let objIdToUpdate = null;
        this.state.data.forEach(dat => {
          if (dat.id === idToUpdate) {
            objIdToUpdate = dat.id;
          }
        });
    
        axios.post("http://localhost:3001/api/updateData", {
          id: objIdToUpdate,
          update: { message: updateMessage }
        });
      };



    render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={dat.id}>
                  <span style={{ color: "gray" }}> id: {dat.id}</span>
                  <br/>
                  <span style={{ color: "gray" }}> data: {dat.message}</span>
                </li>
              ))}
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: parseInt(e.target.value) })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: parseInt( e.target.value) })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }


}

export default App;