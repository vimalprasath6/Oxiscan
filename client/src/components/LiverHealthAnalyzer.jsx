import React from 'react';

function LiverHealthAnalyzer({ formData, onLiverHealthCalculated }) {
  // Reference ranges for liver function tests
  const referenceRanges = {
    tBilirubin: { min: 0.2, max: 1.2, unit: 'mg/dL' },
    sgot: { min: 10, max: 40, unit: 'U/L' },
    sgpt: { min: 7, max: 56, unit: 'U/L' },
    alp: { min: 44, max: 147, unit: 'U/L' },
    ggt: { min: 9, max: 48, unit: 'U/L' },
    tProtein: { min: 6.0, max: 8.3, unit: 'g/dL' },
    albumin: { min: 3.5, max: 5.0, unit: 'g/dL' }
  };

  // Calculate individual parameter status
  const getParameterStatus = (value, range) => {
    if (!value || value === '') return { status: 'not-provided', level: 'Unknown' };
    
    const numValue = parseFloat(value);
    if (numValue < range.min) return { status: 'low', level: 'Low' };
    if (numValue > range.max) return { status: 'high', level: 'High' };
    return { status: 'normal', level: 'Normal' };
  };

  // Calculate liver health score
  const calculateLiverHealthScore = () => {
    let score = 100;
    let abnormalCount = 0;
    const parameters = ['tBilirubin', 'sgot', 'sgpt', 'alp', 'ggt', 'tProtein', 'albumin'];
    
    parameters.forEach(param => {
      const value = formData[param];
      if (value && value !== '') {
        const status = getParameterStatus(value, referenceRanges[param]);
        if (status.status === 'high') {
          if (param === 'sgot' || param === 'sgpt') {
            const numValue = parseFloat(value);
            const maxNormal = referenceRanges[param].max;
            if (numValue > maxNormal * 2) score -= 20;
            else if (numValue > maxNormal * 1.5) score -= 15;
            else score -= 10;
          } else if (param === 'tBilirubin') {
            score -= 15;
          } else if (param === 'ggt') {
            score -= 12;
          } else if (param === 'alp') {
            score -= 10;
          }
          abnormalCount++;
        } else if (status.status === 'low') {
          if (param === 'albumin' || param === 'tProtein') {
            score -= 15; // Low protein/albumin is concerning
          } else {
            score -= 5;
          }
          abnormalCount++;
        }
      }
    });

    // Additional factors affecting liver health
    if (formData.alcoholConsumption === 'high') score -= 15;
    else if (formData.alcoholConsumption === 'moderate') score -= 8;
    
    if (formData.smoking === 'yes') score -= 10;
    
    if (formData.chronicDiseases?.includes('Diabetes')) score -= 10;
    if (formData.chronicDiseases?.includes('Hypertension')) score -= 5;
    
    if (formData.dietType === 'unhealthy') score -= 10;
    if (formData.physicalActivity === 'low') score -= 8;
    
    const bmi = parseFloat(formData.bmi);
    if (bmi >= 30) score -= 12;
    else if (bmi >= 25) score -= 6;

    return Math.max(0, Math.min(100, score));
  };

  // Get liver health level based on score
  const getLiverHealthLevel = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 55) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Critical';
  };

  // Get risk level for ResultsPanel compatibility
  const getRiskLevel = (score) => {
    if (score >= 80) return 'Low';
    if (score >= 60) return 'Moderate';
    return 'High';
  };

  // Generate recommendations
  const generateRecommendations = (score, level) => {
    const recommendations = [];
    
    // Check specific parameters
    const sgotStatus = getParameterStatus(formData.sgot, referenceRanges.sgot);
    const sgptStatus = getParameterStatus(formData.sgpt, referenceRanges.sgpt);
    const bilirubinStatus = getParameterStatus(formData.tBilirubin, referenceRanges.tBilirubin);
    const ggtStatus = getParameterStatus(formData.ggt, referenceRanges.ggt);
    const albuminStatus = getParameterStatus(formData.albumin, referenceRanges.albumin);

    if (sgotStatus.status === 'high' || sgptStatus.status === 'high') {
      recommendations.push("Elevated liver enzymes detected. Consider reducing alcohol consumption and avoiding hepatotoxic medications.");
      recommendations.push("Follow up with hepatologist for further evaluation of liver enzyme elevation.");
    }

    if (bilirubinStatus.status === 'high') {
      recommendations.push("Elevated bilirubin may indicate liver dysfunction or bile duct issues. Medical evaluation recommended.");
    }

    if (ggtStatus.status === 'high') {
      recommendations.push("Elevated GGT suggests possible alcohol-related liver damage or bile duct problems.");
    }

    if (albuminStatus.status === 'low') {
      recommendations.push("Low albumin may indicate impaired liver protein synthesis. Nutritional assessment recommended.");
    }

    // Lifestyle recommendations
    if (formData.alcoholConsumption === 'high' || formData.alcoholConsumption === 'moderate') {
      recommendations.push("Consider reducing alcohol consumption to support liver health.");
    }

    if (formData.smoking === 'yes') {
      recommendations.push("Smoking cessation can improve overall liver health and reduce oxidative stress.");
    }

    if (formData.dietType === 'unhealthy') {
      recommendations.push("Adopt a liver-friendly diet rich in antioxidants, lean proteins, and healthy fats.");
    }

    if (parseFloat(formData.bmi) >= 25) {
      recommendations.push("Weight management can help reduce fatty liver risk and improve liver function.");
    }

    if (formData.physicalActivity === 'low') {
      recommendations.push("Regular exercise helps prevent fatty liver disease and improves overall liver health.");
    }

    // General recommendations based on score
    if (score < 70) {
      recommendations.push("Consider hepatic antioxidant supplements like milk thistle, N-acetylcysteine, or vitamin E (consult your doctor first).");
      recommendations.push("Stay hydrated and avoid processed foods high in sugar and trans fats.");
    }

    if (score < 55) {
      recommendations.push("Schedule regular liver function monitoring with your healthcare provider.");
      recommendations.push("Consider consultation with a hepatologist for comprehensive liver health assessment.");
    }

    return recommendations.length > 0 ? recommendations : [
      "Maintain current healthy lifestyle habits to preserve liver function.",
      "Continue regular health check-ups including liver function tests.",
      "Stay hydrated and maintain a balanced diet rich in antioxidants."
    ];
  };

  // Get liver function test results with status
  const getLiverFunctionResults = () => {
    const results = {};
    Object.entries(referenceRanges).forEach(([param, range]) => {
      const value = formData[param];
      const status = getParameterStatus(value, range);
      const displayName = {
        tBilirubin: 'Total Bilirubin',
        sgot: 'SGOT (AST)',
        sgpt: 'SGPT (ALT)',
        alp: 'ALP',
        ggt: 'GGT',
        tProtein: 'Total Protein',
        albumin: 'Albumin'
      }[param];

      results[param] = {
        name: displayName,
        value: value || 'Not provided',
        unit: range.unit,
        status: status.status,
        level: status.level,
        normalRange: `${range.min}-${range.max} ${range.unit}`
      };
    });
    return results;
  };

  // Calculate and return liver health data
  React.useEffect(() => {
    const liverScore = calculateLiverHealthScore();
    const liverLevel = getLiverHealthLevel(liverScore);
    const riskLevel = getRiskLevel(liverScore);
    const recommendations = generateRecommendations(liverScore, liverLevel);
    const liverFunctionResults = getLiverFunctionResults();

    const liverHealthData = {
      overallScore: liverScore,
      healthLevel: liverLevel,
      riskLevel: riskLevel,
      recommendations: recommendations,
      liverFunctionResults: liverFunctionResults,
      factors: {
        alcohol: formData.alcoholConsumption || 'Not specified',
        diet: formData.dietType?.replace('-', ' ') || 'Not specified',
        exercise: formData.physicalActivity || 'Not specified',
        smoking: formData.smoking === 'yes' ? 'Smoker' : 'Non-smoker',
        bmi: formData.bmi || 'Not specified'
      }
    };

    // Call the callback function to pass data to parent
    if (onLiverHealthCalculated) {
      onLiverHealthCalculated(liverHealthData);
    }
  }, [formData]); // Recalculate if formData changes

  // This component now only handles calculations and doesn't render anything
  return null;
}

export default LiverHealthAnalyzer;