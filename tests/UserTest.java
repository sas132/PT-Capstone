package tests.tests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import tests.User;

class UserTest {

	private User testUser;
	
    @BeforeAll
    static void setup(){
        System.out.println("@BeforeAll executed");
    }
     
    @BeforeEach
    void setupThis(){
        System.out.println("@BeforeEach executed");
        testUser = new User();
    }
	
	@Test
	void testSetUsername() {
		System.out.println("======TEST ONE EXECUTED=======");
		String testName = "Test Name";
		testUser.setUsername(testName);
		Assertions.assertEquals(testUser.getUsername(), testName, UserTest::message);
	}
	
	@Test
	void testAddPoints() {
		System.out.println("======TEST TWO EXECUTED=======");
		int testPoints = 10;
		testUser.addPoints(testPoints);
		Assertions.assertEquals(testPoints, testUser.getPoints(), UserTest::message);
	}
	
	@Test
	void testRemoveTask() {
		System.out.println("======TEST THREE EXECUTED=======");
		int testPoints = 10;
		testUser.addPoints(20);
		testUser.subtractPoints(testPoints);
		Assertions.assertEquals(testPoints, testUser.getPoints(), UserTest::message);
	}
	
	private static String message() {
		return "TEST Execution Failed :: ";
	}
}
