abstract class Test {

  static testMethod(): string {
    return "unimplemented";
  }

}

class Test2 extends Test {

  static testMethod(): string {
    return "Test2 child";
  }

}

class Test3 extends Test {



}