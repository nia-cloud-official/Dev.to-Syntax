use std::collections::HashMap;
use std::fmt::{self, Display};
use std::error::Error;

trait Describe<'a, T> {
    fn describe(&self, input: &'a T) -> String;
}

struct Wrapper<'a, T> {
    value: &'a T,
}

impl<'a, T: Display> Describe<'a, T> for Wrapper<'a, T> {
    fn describe(&self, input: &'a T) -> String {
        format!("🔍 Wrapped value: {}", input)
    }
}

enum Mood {
    Happy,
    Sad,
    Angry,
    Chill,
}

fn react(mood: Mood) -> &'static str {
    match mood {
        Mood::Happy => "😄 Smile on!",
        Mood::Sad => "😢 Take a break.",
        Mood::Angry => "😡 Breathe deep.",
        Mood::Chill => "😎 Code smooth.",
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    let moods: Vec<Mood> = vec![Mood::Happy, Mood::Sad, Mood::Chill];
    let mut reactions: HashMap<&str, &str> = HashMap::new();

    for mood in &moods {
        let response = react(*mood);
        reactions.insert("response", response);
        println!("🧠 Mood: {:?} => Reaction: {}", mood, response);
    }

    let number: i32 = 42;
    let is_ready: bool = true;
    let message: &str = "✨ All systems go.";

    println!("🔢 Number: {}", number);
    println!("✅ Ready: {}", is_ready);
    println!("📣 Message: {}", message);

    let wrapped = Wrapper { value: &number };
    println!("{}", wrapped.describe(&number));

    Ok(())
}