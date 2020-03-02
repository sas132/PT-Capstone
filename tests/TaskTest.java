package tests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import list.Task;
import user.User;

class TaskTest {

	private list.Task testTask;
	private user.User dummyUser;
	
    @BeforeAll
    static void setup(){
    	System.out.println("======TEST TASK CLASS=======");
        System.out.println("@BeforeAll executed");
    }
     
    @BeforeEach
    void setupThis(){
        System.out.println("@BeforeEach executed");
        testTask = new Task();
        dummyUser = new User("Dummy");
    }
    
    @Test 
    void testMarkTaskComplete() {
		System.out.println("======TEST ONE EXECUTED=======");
		testTask.markTaskComplete();
		Assertions.assertEquals(testTask.getCompletionStatus(), true, TaskTest::message);
    }
    
    @Test 
    void testMarkTaskIncomplete() {
		System.out.println("======TEST TWO EXECUTED=======");
		testTask.markTaskIncomplete();
		Assertions.assertEquals(testTask.getCompletionStatus(), false, TaskTest::message);
    }
	
	@Test
	void testSetGoal() {
		System.out.println("======TEST THREE EXECUTED=======");
		String testGoal = "Test Goal";
		testTask.setGoal(testGoal);
		Assertions.assertEquals(testTask.getGoal(), testGoal, TaskTest::message);
	}
	
	@Test
	void testSetPointVal() {
		System.out.println("======TEST FOUR EXECUTED=======");
		int testPoints = 10;
		testTask.setPointVal(testPoints);
		Assertions.assertEquals(testPoints, testTask.getPointVal(), TaskTest::message);
	}
	
	@Test
	void testAssignUser() {
		System.out.println("======TEST FIVE EXECUTED=======");
		testTask.assignUser(dummyUser);
		Assertions.assertEquals(dummyUser.getUsername(), testTask.getUser().getUsername(), TaskTest::message);
	}
	
	private static String message() {
		return "TEST Execution Failed :: ";
	}
}
