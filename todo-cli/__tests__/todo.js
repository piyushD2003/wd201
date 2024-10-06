const todoList = require("../todo");

const {all, markAsComplete, add} = todoList();

describe('Todolist Test Suite', () => {
    beforeAll(()=>{
        add(
            {
                title: "Test todo",
                completed:false,
                dueDate: new Date().toISOString().split("T")[0]
            }
        )
    })
    test('Should add new todo', () => { 
        // expect(all.length).toBe(0);
        const todoItemsCount = all.length
        add(
            {
                title: "Test todo",
                completed:false,
                dueDate: new Date().toISOString().split("T")[0]
            }
        )
        expect(all.length).toBe(todoItemsCount+1)
     })
    
    test('Should mark a todo as complete', () => { 
        expect(all[0].completed).toBe(false)
        markAsComplete(0);
        expect(all[0].completed).toBe(true)
     })
})