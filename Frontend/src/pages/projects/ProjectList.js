import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import {  TableContainer, TableHead, Select, MenuItem } from "@material-ui/core";
//import DatePicker from 'react-date-picker';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';

class ProjectList extends Component {
    
  constructor(props) {
    super(props);
    this.state = {projects: [], isLoading: true,users: [],practices:[],
                    act: 0,
                    index: '',PROJECT_ID: "",
                    PROJECT_NAME:" ",
                    PROJECT_DESCRIPTION:" ",
                    PROJECT_START_DATE:new Date(),
                    PROJECT_END_DATE:new Date(),
                    PROJECT_TYPE : "",
                    PROJECT_METHODOLOGY :"",
                    PROJECT_STATUS : "",
                    INSERT_DATE:new Date().toISOString().substr(0,10),
                    PRACTICE:"",
                    PM_USERNAME:"",
                    SA_USERNAME:""};
    this.remove = this.remove.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeMethodology = this.onChangeMethodology.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeInsertDate = this.onChangeInsertDate.bind(this);
    this.onChangePractice = this.onChangePractice.bind(this);
    this.onChangePM = this.onChangePM.bind(this);
    this.onChangeSA = this.onChangeSA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeInsertDate(e){
    this.setState({ INSERT_DATE: e.target.value})
  }
  onChangeStatus(e){
    this.setState({ PROJECT_STATUS: e.target.value})
  }
  onChangeMethodology(e){
    this.setState({ PROJECT_METHODOLOGY: e.target.value})
  }
  onChangeType(e){
    this.setState({ PROJECT_TYPE: e.target.value})
  }
  onChangeProjectName(e) {
    this.setState({ PROJECT_NAME: e.target.value})
  }
  onChangeDescription(e) {
    this.setState({ PROJECT_DESCRIPTION: e.target.value})
  }
  onChangeStartDate(date) {
    this.setState({ PROJECT_START_DATE: date})
  }
  onChangeEndDate(date) {
    this.setState({ PROJECT_END_DATE: date})
  }
  onChangePractice(e) {
        this.setState({ PRACTICE: e.target.value})
  }
  onChangePM(e) {
        this.setState({ PM_USERNAME: e.target.value})
  }
  onChangeSA(e) {
         this.setState({ SA_USERNAME: e.target.value})
  }
 
  onSubmit(e) {
    alert(this.state.PM_USERNAME);
        const project = {
                    PROJECT_NAME: this.state.PROJECT_NAME,
                    PROJECT_DESCRIPTION:this.state.PROJECT_DESCRIPTION,
                    PROJECT_START_DATE:this.state.PROJECT_START_DATE.toISOString().slice(0, 10),
                    PROJECT_END_DATE:this.state.PROJECT_END_DATE.toISOString().slice(0, 10),
                    PROJECT_TYPE : this.state.PROJECT_TYPE,
                    PROJECT_METHODOLOGY :this.state.PROJECT_METHODOLOGY,
                    PROJECT_STATUS : this.state.PROJECT_STATUS,
                    INSERT_DATE:this.state.INSERT_DATE,
                    PRACTICE:this.state.PRACTICE,
                    PM_USERNAME:this.state.PM_USERNAME,
                    SA_USERNAME:this.state.SA_USERNAME
                }
        console.log(project);
        if(this.state.act === 0){
         fetch('http://20.84.70.197:5000/project-create', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(project),
        }).then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            this.getProjects();
            //this.componentDidMount();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    else{
        fetch('http://20.84.70.197:5000/project-update', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PROJECT_ID: this.state.PROJECT_ID,
                PROJECT_NAME: this.state.PROJECT_NAME,
                PROJECT_DESCRIPTION:this.state.PROJECT_DESCRIPTION,
                PROJECT_START_DATE:this.state.PROJECT_START_DATE.toISOString().slice(0, 10),
                PROJECT_END_DATE:this.state.PROJECT_END_DATE.toISOString().slice(0, 10),
                PROJECT_TYPE : this.state.PROJECT_TYPE,
                PROJECT_METHODOLOGY :this.state.PROJECT_METHODOLOGY,
                PROJECT_STATUS : this.state.PROJECT_STATUS,
                INSERT_DATE:this.state.INSERT_DATE,
                PRACTICE:this.state.PRACTICE,
                PM_USERNAME:this.state.PM_USERNAME,
                SA_USERNAME:this.state.SA_USERNAME
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                this.getProjects();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
        this.setState({act:0});
        this.props.history.push('/projects');
        }

  componentDidMount() {
    this.setState({isLoading: true});
    this.getProjects();

      fetch('http://20.84.70.197:5000/get-users/')
      .then(response => response.json())
      .then(data => this.setState({users: data}));

      fetch('http://20.84.70.197:5000/get-practice/')
      .then(response => response.json())
      .then(data => this.setState({practices: data}));
  }

  getProjects=()=>{
    fetch('http://20.84.70.197:5000/get-projects/')
    .then(response => response.json())
    .then(data => this.setState({projects: data, isLoading: false}));

  }

  handleEdit(id){
      let projects=this.state.projects[id];
     /* this.refs.PROJECT_NAME.value=projects.PROJECT_NAME;
      this.refs.PROJECT_DESCRIPTION.value= projects.PROJECT_DESCRIPTION ;          
      this.refs.PROJECT_START_DATE.value= projects.PROJECT_START_DATE; 
      this.refs.PROJECT_END_DATE.value= projects.PROJECT_END_DATE ;          
      this.refs.PROJECT_TYPE.value= projects.PROJECT_TYPE ;          
      this.refs.PROJECT_METHODOLOGY.value=projects.PROJECT_METHODOLOGY;           
      this.refs.PROJECT_STATUS.value= projects.PROJECT_STATUS;          
       this.refs.INSERT_DATE.value= projects.INSERT_DATE ;          
      this.refs.PRACTICE.value=  projects.PRACTICE;         
      this.refs.PM_USERNAME.value= projects.PM_USERNAME;          
      this.refs.SA_USERNAME.value=projects.SA_USERNAME; */

let startDateParts = projects.PROJECT_START_DATE.split("-");
let endDateParts = projects.PROJECT_END_DATE.split("-");
      this.state.PROJECT_NAME=projects.PROJECT_NAME;
      this.state.PROJECT_DESCRIPTION= projects.PROJECT_DESCRIPTION ;          
      this.state.PROJECT_START_DATE= new Date(startDateParts[2], startDateParts[1] - 1, +startDateParts[0]); 
      this.state.PROJECT_END_DATE=new Date(endDateParts[2]++, endDateParts[1] - 1, +endDateParts[0]);          
      this.state.PROJECT_TYPE= projects.PROJECT_TYPE ;          
      this.state.PROJECT_METHODOLOGY=projects.PROJECT_METHODOLOGY;           
      this.state.PROJECT_STATUS= projects.PROJECT_STATUS;          
       this.state.INSERT_DATE= projects.INSERT_DATE ;          
      this.state.PRACTICE=  projects.PRACTICE;         
      this.state.PM_USERNAME= projects.PM_USERNAME;          
      this.state.SA_USERNAME=projects.SA_USERNAME;
      this.setState({act:1,index:id,PROJECT_ID:projects.PROJECT_ID});

  }

   async remove(PROJECT_ID) {
    await fetch(`http://20.84.70.197:5000/get-project/${PROJECT_ID}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedProjects = [...this.state.projects].filter(i => i.PROJECT_ID !== PROJECT_ID);
      this.setState({projects: updatedProjects});
    });
  }

  render() {
    const {projects, isLoading,users,practices} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
        <div className="projectList">
        <h3 align='center'>Projects</h3>
            <TableContainer component={Paper} >
                <Table  >
                    <TableHead>
                        <TableRow>
                           <StyledTableCell   align="left"><b>Action</b></StyledTableCell>
                            <StyledTableCell  align="left"><b>Project Name</b></StyledTableCell>
                            <StyledTableCell  align="left"><b>Description</b></StyledTableCell>
                            <StyledTableCell  align="left"><b>Start Date</b></StyledTableCell>
                            <StyledTableCell   align="left"><b>End Date</b></StyledTableCell>
                            <StyledTableCell   align="left"><b>Type</b></StyledTableCell>
                            <StyledTableCell   align="left"><b>Methodology</b></StyledTableCell>
                            <StyledTableCell   align="left"><b>Status</b></StyledTableCell>
                            <StyledTableCell   align="left"><b>Practice</b></StyledTableCell>
                            <StyledTableCell   align="left"><b>Project Manager</b></StyledTableCell>
                            <StyledTableCell   align="left"><b>Solution Architect</b></StyledTableCell>                          
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <StyledTableRow >
                    <StyledTableCell component="th" align="left" scope="row">
                                     <td><button color="primary" type="submit" onClick={()=>{this.onSubmit()}}>{this.state.PROJECT_ID === '' ? 'Add' : 'Save'}</button></td>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" style={{width: 10}} > <td><input type="text" style={{width: 70}}  className="form-control" value={this.state.PROJECT_NAME}
onChange={this.onChangeProjectName}/></td></StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td><input type="text" style={{width: 60}} className="form-control" value={this.state.PROJECT_DESCRIPTION}
onChange={this.onChangeDescription}/></td> </StyledTableCell>
                                <StyledTableCell component="th"  scope="row"><td>
                                <DatePicker className='date-input-field' selected={this.state.PROJECT_START_DATE}  onChange={this.onChangeStartDate}  name="startDate"  dateFormat="dd-MM-yyyy"/>
</td> </StyledTableCell>              
                                <StyledTableCell component="th" scope="row"><td>
                                <DatePicker className='date-input-field' selected={this.state.PROJECT_END_DATE}  onChange={this.onChangeEndDate}  name="endDate"  dateFormat="dd-MM-yyyy"/>
                                  </td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"><td>
                                <Select id="project_type" style={{width: 30,fontSize:12}} value={this.state.PROJECT_TYPE}  onChange={this.onChangeType}>
                                  <MenuItem style={{fontSize:12}} value={"TM"}>{"TM"}</MenuItem>
                                  <MenuItem style={{fontSize:12}} value={"FP"}>{"FP"}</MenuItem>
                                </Select></td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"><td> 
                                 <Select id="demo-simple-select4" style={{width: 90,fontSize:12}} value={this.state.PROJECT_METHODOLOGY}  onChange={this.onChangeMethodology}>
                                  <MenuItem style={{fontSize:12}} value={"AGILE"}>{"AGILE"}</MenuItem>
                                  <MenuItem style={{fontSize:12}} value={"WATERFALL"}>{"WATERFALL"}</MenuItem>
                                     </Select></td></StyledTableCell>
                                 <StyledTableCell component="th" scope="row"><td>
                                 <Select id="status" style={{width: 70,fontSize:12}} value={this.state.PROJECT_STATUS}  onChange={this.onChangeStatus}>
                                  <MenuItem style={{fontSize:12}} value={"OPEN"}>{"OPEN"}</MenuItem>
                                  <MenuItem style={{fontSize:12}} value={"ON-HOLD"}>{"ON-HOLD"}</MenuItem>
                                  <MenuItem style={{fontSize:12}} value={"CLOSED"}>{"CLOSED"}</MenuItem>
                                </Select></td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td>
                                <Select  style={{fontSize:12}} id="demo-simple-select1" value={this.state.PRACTICE}
                 onChange={this.onChangePractice} >{practices.map((data) => (<MenuItem value={data.PRACTICE_ID}>{`${data.practice} - ${data.location}`}</MenuItem>))}
                 </Select>      </td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td>
                                <Select id="demo-simple-select2" style={{fontSize:12}} value={this.state.PM_USERNAME}
                                     onChange={this.onChangePM}>
                                  {users.map((data) => (<MenuItem value={data.user_name}>{data.user_name}</MenuItem>))}
                                     </Select> 
                                   </td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td>
                                <Select  id="demo-simple-select3" style={{fontSize:12}} value={this.state.SA_USERNAME}
                                     onChange={this.onChangeSA}>
                                  {users.map((data) => (<MenuItem value={data.user_name}>{data.user_name}</MenuItem>))}
                                     </Select> 
                                    </td> </StyledTableCell>
                     </StyledTableRow>

                        {projects.map((data,i) => (
                            <StyledTableRow key={i}>
                              <StyledTableCell component="th" scope="row"> <td>
                               <ButtonGroup size="5px" width="5px">
                              {/* <Button size="5px" color="primary" tag={Link} to={"/projects/" + data.PROJECT_ID}>Edit</Button> */}
                              <button color="primary" type="submit" onClick={()=>{this.handleEdit(i)}}>Edit</button>
                                </ButtonGroup></td>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row"><td>{data.PROJECT_NAME}</td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"><td>{data.PROJECT_DESCRIPTION}</td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"><td>{data.PROJECT_START_DATE}</td> </StyledTableCell>              
                                <StyledTableCell component="th" scope="row"> <td>{data.PROJECT_END_DATE}</td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td>{data.PROJECT_TYPE}</td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td>{data.PROJECT_METHODOLOGY}</td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td>{data.PROJECT_STATUS}</td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td>{data.practice_detail}</td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td>{data.PM_USERNAME}</td> </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> <td>{data.SA_USERNAME}</td> </StyledTableCell>     
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
   {/*     <form class="form-vertical" ref="myForm">
		   Project Name:<input type="text" class="form-control" ref="PROJECT_NAME" placeholder="Enter Project"/>
              Description : <input type="text" class="form-control" ref="PROJECT_DESCRIPTION" placeholder="Description"/>
          
     
            <label>Start Date</label>
            <input type="text" ref="PROJECT_START_DATE" placeholder=""/>
       
            <label>End Date</label>
            <input type="text" ref="PROJECT_END_DATE" placeholder="" />
          
            <label>Methodology</label>
            <input type="text" ref="PROJECT_METHODOLOGY" placeholder=""/>
          
            <label>Project Type</label>
            <input type="text" ref="PROJECT_TYPE" placeholder=""/>
          
            <label  for="Status">Status</label>
            <input type="text" ref="PROJECT_STATUS"  placeholder=""/>
          
            <label for="insertdate">Insert Date</label>
            <input type="text" ref="INSERT_DATE"  placeholder=""/>
          
            <label for="practice">Pratice</label>
            <input type="text" ref="PRACTICE"  placeholder=""/>
                  
            <label for="pmusername">Project Manager</label>
            <input type="text" ref="PM_USERNAME" placeholder=""/>
          
            <label for="sausername">Solution Architect</label>
            <input type="text" ref="SA_USERNAME" />
            <button color="primary" type="submit" onClick={()=>{this.handleSubmit()}}>Save</button>
          
          
        </form>
         handleSubmit(e){
     // e.preventDefault();
      const newproject = {
        PROJECT_NAME: this.refs.PROJECT_NAME.value,
        PROJECT_DESCRIPTION:this.refs.PROJECT_DESCRIPTION.value,
        PROJECT_START_DATE:this.refs.PROJECT_START_DATE.value,
        PROJECT_END_DATE:this.refs.PROJECT_END_DATE.value,
        PROJECT_TYPE : this.refs.PROJECT_TYPE.value,
        PROJECT_METHODOLOGY :this.refs.PROJECT_METHODOLOGY.value,
        PROJECT_STATUS : this.refs.PROJECT_STATUS.value,
        INSERT_DATE:this.refs.INSERT_DATE.value,
        PRACTICE:this.refs.PRACTICE.value,
        PM_USERNAME:this.refs.PM_USERNAME.value,
        SA_USERNAME:this.refs.SA_USERNAME.value
    }
    if(this.state.act === 0){
         fetch('http://20.84.70.197:5000/project-create', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newproject),
        }).then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            this.getProjects();
            //this.componentDidMount();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    else{
        fetch('http://20.84.70.197:5000/project-update', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PROJECT_ID: this.state.PROJECT_ID,
                PROJECT_NAME: this.refs.PROJECT_NAME.value,
                PROJECT_DESCRIPTION:this.refs.PROJECT_DESCRIPTION.value,
                PROJECT_START_DATE:this.refs.PROJECT_START_DATE.value,
                PROJECT_END_DATE:this.refs.PROJECT_END_DATE.value,
                PROJECT_TYPE : this.refs.PROJECT_TYPE.value,
                PROJECT_METHODOLOGY :this.refs.PROJECT_METHODOLOGY.value,
                PROJECT_STATUS : this.refs.PROJECT_STATUS.value,
                INSERT_DATE:this.refs.INSERT_DATE.value,
                PRACTICE:this.refs.PRACTICE.value,
                PM_USERNAME:this.refs.PM_USERNAME.value,
                SA_USERNAME:this.refs.SA_USERNAME.value
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                this.getProjects();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    this.setState({act:0});
        this.props.history.push('/projects');

    this.refs.myForm.reset();

  }
        */}
        </div >
    );


  }
}

export default ProjectList;




const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#b31317',
        color: 'white',
        fontFamily:"'Montserrat', sans-serif"
    },
    body: {

        fontSize: 11,
        fontFamily:"'Montserrat', sans-serif"
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);