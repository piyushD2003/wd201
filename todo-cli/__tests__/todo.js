// const todoList = require("../todo");

// const {all, markAsComplete, add} = todoList();

// describe('Todolist Test Suite', () => {
//     beforeAll(()=>{
//         add(
//             {
//                 title: "Test todo",
//                 completed:false,
//                 dueDate: new Date().toISOString().split("T")[0]
//             }
//         )
//     })
//     test('Should add new todo', () => { 
//         // expect(all.length).toBe(0);
//         const todoItemsCount = all.length
//         add(
//             {
//                 title: "Test todo",
//                 completed:false,
//                 dueDate: new Date().toISOString().split("T")[0]
//             }
//         )
//         expect(all.length).toBe(todoItemsCount+1)
//      })
    
//     test('Should mark a todo as complete', () => { 
//         expect(all[0].completed).toBe(false)
//         markAsComplete(0);
//         expect(all[0].completed).toBe(true)
//      })
// })

const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe('Todolist Test Suite', () => {
  beforeAll(() => {
    // Adding some sample todos for testing
    add({
      title: "Overdue todo",
      completed: false,
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Yesterday
    });

    add({
      title: "Due today todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0], // Today
    });

    add({
      title: "Due later todo",
      completed: false,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Tomorrow
    });
  });

  test('Should add new todo', () => {
    const todoItemsCount = all.length;
    add({
      title: "New todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0], // Today
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test('Should mark a todo as complete', () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test('Should retrieve overdue items', () => {
    const overdueItems = overdue();
    expect(overdueItems.length).toBe(1); // Only one todo is overdue
    expect(overdueItems[0].title).toBe("Overdue todo");
  });

  test('Should retrieve due today items', () => {
    const dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(2); // Two todos are due today, the one added in beforeAll and the new one
  });

  test('Should retrieve due later items', () => {
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(1); // Only one todo is due later
    expect(dueLaterItems[0].title).toBe("Due later todo");
  });
});
