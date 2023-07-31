public static void Main(string[] args)
{
    Console.WriteLine("Enter string");
    var input = Console.ReadLine();
    Console.WriteLine(ReverseWord(input));
    Console.WriteLine(ReverseEachWord(input));
    Console.WriteLine(CheckPalindrome(input));
    Console.WriteLine(CapitalizeSentence(input));
    int myInt;
    if (!Int32.TryParse(input, out myInt)) return;
    try
    {
        Console.WriteLine(CalculateFactorial(myInt));
    }
    catch (ArgumentOutOfRangeException)
    {
        Console.WriteLine("Please enter a positive number!");
    }
}

private static int CalculateFactorial(int number)
{
    if (number < 0) throw new ArgumentOutOfRangeException(nameof(number));
    var calculation = 1;
    for (var i = 2; i <= number; i++) 
        calculation *= i;
    return calculation;
}

private static string CapitalizeSentence(string input)
{
    var split = input.Split();
    var sb = new StringBuilder();
    foreach (var str in split)
        sb.Append($"{str[0].ToString().ToUpper()}{str.Substring(1)} ");
    return sb.ToString().TrimEnd();
}

private static bool CheckPalindrome(string word)
{
    for (var i = 0; i < word.Length / 2; i++)
    {
        if (word[i] != word[word.Length - 1 - i])
            return false;
    }
    return true;
}

private static string ReverseEachWord(string input)
{
    var split = input.Split();
    var sb = new StringBuilder();
    foreach (var str in split)
        sb.Append($"{ReverseWord(str)} ");
    return sb.ToString().TrimEnd();
}

private static string ReverseWord(string str)
{
    var charArray = str.ToCharArray();
    var sb = new StringBuilder();
    for (var i = charArray.Length - 1; i >= 0; i--)
    {
        sb.Append(charArray[i]);
    }
    return sb.ToString();
}
