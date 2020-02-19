package tests;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ListTest {

	private List testList;
	
    @BeforeAll
    static void setup(){
        System.out.println("@BeforeAll executed");
    }
     
    @BeforeEach
    void setupThis(){
        System.out.println("@BeforeEach executed");
    	testList = new List();
    }
	
	@Test
	void testSetName() {
		System.out.println("======TEST ONE EXECUTED=======");
		String testName = "Test Name";
		testList.setName(testName);
		Assertions.assertEquals(testList.getName(), testName, ListTest::message);
		fail("Not yet implemented");
	}
	
	private static String message() {
		return "TEST Execution Failed :: ";
	}
}
