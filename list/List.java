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

    public void removeTask(String taskName) {
        //TODO: make sure this works this easily??
        tasks.remove(taskName);
    }
    
    public void removeTask(int index) {
        //TODO: check if index is valid
        tasks.remove(index);
    }

    public void clearList() {
        tasks.clear();
    }
    
}
