// Print even numbers from 1 to input number
public static void Exercise1()
{
    Console.WriteLine("Enter a number: ");
    string s = Console.ReadLine();
    int myNum = Int32.Parse(s);
    for (int i = 1; i <= myNum; i++) {
        if (i % 2 == 0) {
            Console.WriteLine(i);
        }
    }
}

// Remove duplicate characters from an input string
public static void Exercise2()
{
    Console.WriteLine("Enter text: ");
    string input = Console.ReadLine();
    StringBuilder sb = new StringBuilder();
    HashSet<char> charSet = new HashSet<char>();
    for (int i = 0; i < input.Length; i++) {
        if (!charSet.Contains(input[i])) {
            charSet.Add(input[i]);
            sb.Append(input[i]);
        }
    }
    Console.WriteLine(sb.ToString());
}