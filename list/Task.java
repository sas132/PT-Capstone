package list;

import user.User;

public class Task {
    private String goal;
    private boolean completed;

    private User assignedUser;

    public Task() {
        this.completed = false;
    }

    public Task(String goal) {
        this.goal = goal;
    }

    public void markTaskComplete() {
        this.completed = true;
    }

    public void markTaskIncomplete() {
        this.completed = false;
    }

    public boolean getCompletionStatus() {
        return completed;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public String getGoal() {
        return goal;
    }

    public void assignUser(User user) {
        this.assignedUser = user;
    }

    public User getUser(){
        return assignedUser;
    }
}