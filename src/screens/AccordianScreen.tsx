import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
const AccordianScreen = () => {
  const [activeSections, setActiveSections] = useState([]);
  const SECTIONS = [
    {
      title: 'First',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrystandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    },
    {
      title: 'Second',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrystandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    },
  ];

  const renderSectionTitle = (section: any) => {
    return (
      <View style={{padding: 20, backgroundColor: '#fff'}}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const renderHeader = (section: any) => {
    return (
      <View style={{padding: 20, backgroundColor: '#fff'}}>
        <Text style={{}}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section: any) => {
      console.log('section=======>',section)
    return (
      <View style={{padding: 20, backgroundColor: 'red'}}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections: any) => {
      console.log('activeSections=======>',activeSections)
    setActiveSections(activeSections);
  };
  return (
    <View>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderSectionTitle={renderSectionTitle}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </View>
  );
};

export default AccordianScreen;
