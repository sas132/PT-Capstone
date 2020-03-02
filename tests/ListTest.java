package tests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import tests.List;
import tests.Task;

class ListTest {

	private List testList;
	private Task dummyTask;
	
    @BeforeAll
    static void setup(){
        System.out.println("@BeforeAll executed");
    }
     
    @BeforeEach
    void setupThis(){
        System.out.println("@BeforeEach executed");
    	testList = new List();
    	dummyTask = new Task("dummy Goal", 10);
    }
	
	@Test
	void testSetName() {
		System.out.println("======TEST ONE EXECUTED=======");
		String testName = "Test Name";
		testList.setName(testName);
		Assertions.assertEquals(testList.getName(), testName, ListTest::message);
	}
	
	@Test
	void testAddTask() {
		System.out.println("======TEST TWO EXECUTED=======");
		testList.addTask(dummyTask);
		Assertions.assertEquals(dummyTask.getGoal(), testList.getTasks().get(0).getGoal(), ListTest::message);
	}
	
	@Test
	void testRemoveTask() {
		System.out.println("======TEST THREE EXECUTED=======");
		testList.addTask(dummyTask);
		testList.removeTask(testList.getTasks().indexOf(dummyTask));
		Assertions.assertEquals(0, testList.getTasks().size(), ListTest::message);
	}
	
	@Test
	void testClearList() {
		System.out.println("======TEST FOUR EXECUTED=======");
		testList.addTask(dummyTask);
		testList.addTask(dummyTask);
		testList.addTask(dummyTask);
		testList.clearList();
		Assertions.assertEquals(0, testList.getTasks().size(), ListTest::message);
	}
	
	private static String message() {
		return "TEST Execution Failed :: ";
	}
}
