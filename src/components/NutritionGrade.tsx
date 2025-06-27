interface NutritionGradeProps {
  grade?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function NutritionGrade({ grade, size = 'md' }: NutritionGradeProps) {
  if (!grade) {
    return (
      <span className={`inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold ${
        size === 'sm' ? 'w-6 h-6 text-xs' : size === 'lg' ? 'w-12 h-12 text-xl' : 'w-8 h-8 text-sm'
      }`}>
        ?
      </span>
    );
  }

  const normalizedGrade = grade.toUpperCase();
  
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-500 text-white';
      case 'B':
        return 'bg-lime-500 text-white';
      case 'C':
        return 'bg-yellow-500 text-white';
      case 'D':
        return 'bg-orange-500 text-white';
      case 'E':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <span className={`inline-flex items-center justify-center rounded-full font-bold ${
      size === 'sm' ? 'w-6 h-6 text-xs' : size === 'lg' ? 'w-12 h-12 text-xl' : 'w-8 h-8 text-sm'
    } ${getGradeColor(normalizedGrade)}`}>
      {normalizedGrade}
    </span>
  );
}