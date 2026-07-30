enum CategoryType {
  CLOTHING = 'Clothing',
  FOOD = 'Food',
  HOME = 'Home',
  GADGETS = 'Gadgets',
}

enum ExpenseStatus {
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
}

// Match supabase's format
enum UserDataKeys {
  DISPLAY_NAME = 'display_name',
  PROFILE_PICTURE = 'profile_picture',
}

export { CategoryType, ExpenseStatus, UserDataKeys };
