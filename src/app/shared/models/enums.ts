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
enum UserMetaDataKeys {
  DISPLAY_NAME = 'display_name',
  PROFILE_PICTURE = 'profile_picture',
  CONFIRMATION_DONE = 'confirmation_done',
}

export { CategoryType, ExpenseStatus, UserMetaDataKeys };
