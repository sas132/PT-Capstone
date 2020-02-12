package user;

public class User {
    private String username;

    private int points;

    public User() {
        this.username = "";
        this.points = 0;
    }

    public User(String username) {
        this.username = username;
        this.points = 0;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getPoints(){
        return points;
    }

    public void addPoints(int pointsToAdd) {
        points += pointsToAdd;
    }

    public void subtractPoints(int pointsToSubtract) {
        points -= pointsToSubtract;
    }


}