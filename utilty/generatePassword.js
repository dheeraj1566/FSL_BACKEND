function generatePassword(string_length = 10) {
    var chars = [
        { type: "digits", chars: "0123456789" },
        { type: "uppercase", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
        { type: "lowercase", chars: "abcdefghijklmnopqrstuvwxyz" },
        { type: "special characters", chars: "!@#$%^&*" }
    ];

    var randomstring = "";

    var digit = chars[0].chars.charAt(
        Math.floor(Math.random() * chars[0].chars.length)
    );
    var specialChar = chars[3].chars.charAt(
        Math.floor(Math.random() * chars[3].chars.length)
    );

    randomstring += digit;
    randomstring += specialChar;

    for (var i = randomstring.length; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * 2) + 1;
        var charSet = rnum === 1 ? chars[1].chars : chars[2].chars;
        var charIndex = Math.floor(Math.random() * charSet.length);
        randomstring += charSet.charAt(charIndex);
    }

    randomstring = randomstring
        .split("")
        .sort(function () {
            return 0.5 - Math.random();
        })
        .join("");

    return randomstring;
}

export default generatePassword;
