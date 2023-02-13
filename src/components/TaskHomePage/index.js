import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {
  BgMainContainer,
  Heading,
  AddButton,
  Form,
  InputContainer,
  Buttons,
  UlContainer,
} from './styleComponents'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TaskHomePage extends Component {
  state = {
    task: '',
    enteredTag: tagsList[0].optionId,
    arrayList: [],
    selectTag: 'INITIAL',
  }

  addTask = event => {
    this.setState({task: event.target.value}, this.renderTasks)
  }

  activeStatus = event => {
    this.setState({enteredTag: event.target.value})
  }

  onAddSubmit = event => {
    event.preventDefault()
    const {task, enteredTag} = this.state
    const newTaskItem = {task, enteredTag, id: uuidv4()}
    this.setState(prev => ({
      arrayList: [...prev.arrayList, newTaskItem],
      task: '',
      enteredTag: '',
    }))
  }

  renderFilterList = event => {
    this.setState(prev => ({
      selectTag:
        prev.selectTag === event.target.value ? 'INITIAL' : event.target.value,
    }))
  }

  renderTasksList = () => {
    const {arrayList, activeTag} = this.state
    const filteredTaskList =
      activeTag === 'INITIAL'
        ? arrayList
        : arrayList.filter(each => each.enteredTag === activeTag)
    return (
      <>
        <ul>
          {filteredTaskList.map(each => (
            <li key={each.id}>
              <p>{each.task}</p>
              <p>{each.tag}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderAddTask = () => {
    const {task, enteredTag} = this.state
    return (
      <div>
        <Heading> Create a Task!</Heading>

        <Form onSubmit={this.onAddSubmit}>
          <InputContainer>
            <label htmlFor="inputTask">Task</label>
            <input
              type="text"
              id="inputTask"
              placeholder="Enter the task here"
              value={task}
              onChange={this.addTask}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="InputTag"> Tags</label>
            <select
              onChange={this.renderFilterList}
              id="InputTag"
              value={enteredTag}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </InputContainer>
          <AddButton type="submit">Add Task</AddButton>
        </Form>
      </div>
    )
  }

  renderTasks = () => {
    const {arrayList, selectTag} = this.state

    return (
      <div>
        <h1>Tags</h1>
        <UlContainer>
          {tagsList.map(each => {
            const isactive = selectTag === each.optionId
            return (
              <li key={each.optionId}>
                <Buttons
                  type="button"
                  value={each.optionId}
                  onClick={this.renderFilterList}
                  isSelected={isactive}
                >
                  {each.displayText}
                </Buttons>
              </li>
            )
          })}
        </UlContainer>
        <h1>Tasks</h1>

        {arrayList.length === 0 ? (
          <div>
            <p>No Tasks Added Yet</p>
          </div>
        ) : (
          this.renderTasksList()
        )}
      </div>
    )
  }

  render() {
    return (
      <BgMainContainer>
        {this.renderAddTask()}

        {this.renderTasks()}
      </BgMainContainer>
    )
  }
}

export default TaskHomePage
