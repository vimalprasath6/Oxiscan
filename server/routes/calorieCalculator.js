// Function to calculate maintenance calories and weight management targets
export function calculateCalories(userData) {
    // Extract relevant user data
    const { age, weight, height, gender = 'female', physicalActivity } = userData;
    
    let bmr = 0;
    
    // Calculate BMR using Mifflin-St Jeor Equation
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity multiplier
    let activityMultiplier = 1.2; // Default to sedentary
    
    switch (physicalActivity) {
      case 'low':
        activityMultiplier = 1.2; // Sedentary
        break;
      case 'moderate':
        activityMultiplier = 1.55; // Moderate exercise 3-5 days/week
        break;
      case 'high':
        activityMultiplier = 1.725; // Active - hard exercise 6-7 days/week
        break;
      default:
        activityMultiplier = 1.2;
    }
    
    // Calculate maintenance calories
    const maintenanceCalories = Math.round(bmr * activityMultiplier);
    
    // Calculate different calorie targets
    return {
      maintenanceCalories,
      calorieTargets: {
        maintain: {
          calories: maintenanceCalories,
          description: "Maintain weight",
          deficit: 0
        },
        mildLoss: {
          calories: Math.round(maintenanceCalories * 0.9), // 10% deficit
          description: "Mild weight loss",
          deficit: 10
        },
        moderateLoss: {
          calories: Math.round(maintenanceCalories * 0.8), // 20% deficit
          description: "Weight loss",
          deficit: 20
        },
        extremeLoss: {
          calories: Math.round(maintenanceCalories * 0.75), // 25% deficit
          description: "Extreme weight loss",
          deficit: 25
        }
      }
    };
  }
  