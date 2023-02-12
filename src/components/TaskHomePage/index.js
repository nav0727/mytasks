import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {
  BgMainContainer,
  Heading,
  AddButton,
  Form,
  InputContainer,
  Buttons,
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
    activeTag: tagsList[0].optionId,
    arrayList: [],
    selectTag: 'INITIAL',
    renderList: [],
    id: uuidv4(),
  }

  componentDidMount() {
    this.renderTasks()
  }

  activeStatus = event => {
    event.preventDefault()
    this.setState({activeTag: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {task, activeTag, id} = this.state
    const item = {task, activeTag, id}
    return this.setState(prev => ({
      arrayList: [...prev.arrayList, item],
      task: '',
    }))
  }

  addTask = event => {
    event.preventDefault()
    this.setState({task: event.target.value}, this.renderTasks)
  }

  renderFilterList = event => {
    event.preventDefault()
    const {arrayList, selectTag} = this.state

    this.setState(prev => ({
      selectTag:
        prev.selectTag === event.target.value ? 'INITIAL' : event.target.value,
    }))
    const arr =
      selectTag === 'INITIAL'
        ? arrayList
        : arrayList.filter(each => each.activeTag === selectTag)
    this.setState({renderList: arr})
  }

  renderTasks = () => {
    const {renderList, selectTag} = this.state

    return (
      <div>
        <h1>Tags</h1>
        <ul>
          {tagsList.map(each => (
            <Buttons
              type="button"
              key={each.optionId}
              value={each.optionId}
              onClick={this.renderFilterList}
              isSelected={each.optionId === selectTag}
            >
              {each.displayText}
            </Buttons>
          ))}
        </ul>
        <h1>Tasks</h1>
        <ul>
          {renderList.length === 0 ? (
            <div>
              <h1>No Tasks Added Yet</h1>
            </div>
          ) : (
            renderList.map(each => (
              <li>
                <p>{each.task}</p>
                <button type="button">{each.activeTag}</button>
              </li>
            ))
          )}
        </ul>
      </div>
    )
  }

  renderAddTask = () => {
    const {task} = this.state
    return (
      <Form onSubmit={this.onAdd}>
        <InputContainer>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            id="task"
            placeholder="Enter the task here"
            value={task}
            onChange={this.addTask}
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="tags"> Tags</label>
          <select onChange={this.activeStatus} id="tags">
            {tagsList.map(each => (
              <option key={each.optionId} value={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
        </InputContainer>
        <AddButton type="submit"> Add Task</AddButton>
      </Form>
    )
  }

  render() {
    return (
      <BgMainContainer>
        <div>
          <Heading> Create a Task!</Heading>
          {this.renderAddTask()}
        </div>

        {this.renderTasks()}
      </BgMainContainer>
    )
  }
}

export default TaskHomePage
