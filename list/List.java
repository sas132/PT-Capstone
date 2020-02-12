package list;

import java.util.ArrayList;

public class List {
    private String name;
    private ArrayList<Task> tasks;

    public List() {
        this.tasks = new ArrayList<>();
    }

    public List(String name) {
        this();
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public ArrayList<Task> getTasks() {
        return this.tasks;
    }

    public void setName(String name) {
        this.name = name;
    }


    public void addTask(Task task) {
        this.tasks.add(task);
    }

    public void removeTask() {
        //This can be based on a string search, by index or whatever. Im leaving it until further progress is made
    }

    public void clearList() {
        tasks.clear();
    }
    
}